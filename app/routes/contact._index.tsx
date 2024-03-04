import React, {useEffect, useRef, useState} from "react";
import {Alert, InternalHeader, Modal, Search, Spacer,} from "@navikt/ds-react";
import ContactTable from "~/components/contacts-table";
import {PersonPlusIcon} from '@navikt/aksel-icons';
import { IContact, IOrganization} from '~/api/types'
import ContactApi from "~/api/contact-api";
import type {ActionFunctionArgs} from '@remix-run/node';
import { json } from '@remix-run/node';
import {useActionData, useFetcher, useLoaderData} from "@remix-run/react";
import OrganizationApi from "~/api/organization-api";
import ContactForm from "~/components/contact-form";
import {defaultContact} from "~/api/types";


export const loader = async () => {
    try {
        const [contactsData, organizationsData] = await Promise.all([
            ContactApi.fetch(),
            OrganizationApi.fetch()
        ]);
        return json({ contactsData, organizationsData });
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === "object" && error !== null && "message" in error;
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const actionType = formData.get("actionType");

    // Initial transformation to a basic object
    let formValues: any = {}; // Temporarily using 'any' for initial transformation
    for (const [key, value] of formData) {
        formValues[key] = value;
    }

    // Transform formValues to match the IContact interface
    const contactData: IContact = {
        dn: formValues.dn.toString(),
        nin: formValues.nin.toString(),
        firstName: formValues.firstName.toString(),
        lastName: formValues.lastName.toString(),
        mail: formValues.mail.toString(),
        mobile: formValues.mobile.toString(),
        technical: formValues.technical ? formValues.technical.toString().split(",") : null,
        legal: formValues.legal ? formValues.legal.toString().split(",") : null,
        supportId: formValues.supportId ? formValues.supportId.toString() : null,
        roles: formValues.roles ? formValues.roles.toString().split(",") : null,
    };

    try {
        let response;
        switch (actionType) {
            case "create":
                response = await ContactApi.create(contactData);
                break;
            case "update":
                response = await ContactApi.update(contactData);
                break;
            case "delete":
                response = await ContactApi.delete(contactData);
                break;
            default:
                return json({ show: true, message: "Unknown action type", variant: "error" });
        }
        return json({ show: true, message: response?.message, variant: response?.variant });
    } catch (error) {
        if (isErrorWithMessage(error)) {
            // Now TypeScript knows error has a message property
            return json({ show: true, message: error.message, variant: "error" });
        } else {
            // Handle the case where the error does not have a message property
            return json({ show: true, message: "An unknown error occurred", variant: "error" });
        }
    }
}

interface LoaderData {
    organizationsData: IOrganization[];
    contactsData: IContact[];
}

const initialContactArray: IContact[] = [];

export default function ContactPage() {
    const [filteredData, setFilteredData] = useState<IContact[]>(initialContactArray);
    const contactEditRef = useRef<HTMLDialogElement>(null!);
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<LoaderData>();
    const organizationsData = loaderData.organizationsData;
    const contactsData = loaderData.contactsData;

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

            {actionData && show && (
                <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton onClose={() => setShow(false)}>
                    {actionData.message || "Content"}
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
