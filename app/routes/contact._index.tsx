import React, {useEffect, useRef, useState} from "react";
import {Alert, InternalHeader, Modal, Search, Spacer,} from "@navikt/ds-react";
import ContactTable from "~/components/contacts-table";
import {PersonPlusIcon} from '@navikt/aksel-icons';
import type {IContact} from '~/api/types'
import ContactApi from "~/api/contact-api";
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {useFetcher, useLoaderData} from "@remix-run/react";
import OrganizationApi from "~/api/organization-api";
import ContactForm from "~/components/contact-form";
import {defaultContact} from "~/api/types";


export const loader: LoaderFunction = async () => {
    try {
        const [contactsData, organizationsData] = await Promise.all([
            ContactApi.fetchContacts(),
            OrganizationApi.fetchOrganizations()
        ]);
        return json({ contactsData, organizationsData });
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

export async function action({ request }) {

    const formData = await request.formData();
    const formValues = {};
    const actionType = formData.get("actionType");

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    console.log("formValues", formValues);

    if(actionType === "create") {
        try {
            const response = await ContactApi.createContact(formValues);
            return json({ show: true, message: response?.message, variant: response?.variant });
        } catch (error) {
            // Handle any errors here
            return json({ show: true, message: error.message, variant: "error" });
        }
    } else if(actionType === "update") {
        try {
            const response = await ContactApi.updateContact(formValues);
            return json({ show: true, message: response.message, variant: response.variant });
        } catch (error) {
            return json({ show: true, message: error.message, variant: "error" });
        }
    } else if(actionType === "delete") {
        try {
            const response = await ContactApi.deleteContact(formValues);
            return json({ show: true, message: response.message, variant: response.variant });
        } catch (error) {
            return json({ show: true, message: error.message, variant: "error" });
        }
    }

    return json({ show: true, message: "Unknown action type", variant: "error" });

}

export default function ContactPage() {
    const [filteredData, setFilteredData] = useState<[IContact]>([]);
    const contactEditRef = useRef<HTMLDialogElement>(null!);
    const { contactsData, organizationsData } = useLoaderData();
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();

    useEffect(() => {
        setShow(true);
    }, [fetcher.state]);

    const handleSearchInputChange = (input: any) => {
        setSearch(input);
        const filtered = contactsData.filter(
            (row) =>
                row.firstName.toLowerCase().includes(input.toLowerCase()) ||
                row.lastName.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <Modal ref={contactEditRef} header={{ heading: "Add New Contact" }} width={400}>
                <Modal.Body>
                    <ContactForm  selectedContact={defaultContact} f={fetcher} r={contactEditRef}/>
                </Modal.Body>
            </Modal>

            {fetcher.data && show && (
                <Alert variant={fetcher.data.variant} closeButton onClose={() => setShow(false)}>
                    {(fetcher.data && fetcher.data.message) || "Content"}
                </Alert>
            )}

            <InternalHeader>
                <InternalHeader.Button onClick={() => contactEditRef.current?.showModal()}>
                    <PersonPlusIcon title="a11y-title" fontSize="1.5rem"/>Add New
                </InternalHeader.Button>

                <Spacer/>
                <form
                    className="self-center px-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Search!");
                    }}
                >
                    <Search
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                        onChange={handleSearchInputChange}
                    />
                </form>

            </InternalHeader>

            <ContactTable
                data={search !== "" ? filteredData : contactsData}
                organizations={organizationsData}
                f={fetcher}
            />

        </div>
    );
}
