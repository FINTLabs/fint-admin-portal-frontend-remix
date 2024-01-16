import React, {useRef, useState} from "react";
import {InternalHeader, Search, Spacer,} from "@navikt/ds-react";
import ContactTable from "~/components/contacts-table";
import {PersonPlusIcon} from '@navikt/aksel-icons';
import CustomFormModal from "~/components/contact-add";
import type {IContact} from '~/api/types'
import ContactApi from "~/api/contact-api";
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {useLoaderData} from "@remix-run/react";
import OrganizationApi from "~/api/organization-api";


export const loader: LoaderFunction = async () => {
    try {
        const [contactsData, organizationsData] = await Promise.all([
            ContactApi.fetchContacts(),
            OrganizationApi.fetchOrganizations() // Adjust this call as needed
        ]);
        return json({ contactsData, organizationsData });
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

export default function ContactPage() {
    const [filteredData, setFilteredData] = useState<[IContact]>([]);
    const contactEditRef = useRef<HTMLDialogElement>(null!);
    const { contactsData, organizationsData } = useLoaderData();
    const [search, setSearch] = useState<string>("");

    const handleSearchInputChange = (input: any) => {
        setSearch(input);
        const filtered = contactsData.filter(
            (row) =>
                row.firstName.toLowerCase().includes(input.toLowerCase()) ||
                row.lastName.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFormClose = () => {
        // TODO: Handle form submission logic
        console.log("closing the contact add form inside index");
        contactEditRef.current?.close();
    };


    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <CustomFormModal
                ref={contactEditRef}
                headerText="Add New Contact Form"
                onClose={handleFormClose}
                selectedContact={null}
            />

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

            <ContactTable data={search !== "" ? filteredData : contactsData} organizations={organizationsData} />

        </div>
    );
}
