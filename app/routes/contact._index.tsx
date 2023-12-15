import type {LinksFunction, MetaFunction} from "@remix-run/node";
import React, {useEffect, useRef, useState} from "react";
import {InternalHeader, Search, Spacer,} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import ContactTable from "~/components/contacts-table";
import {PersonPlusIcon} from '@navikt/aksel-icons';
import CustomFormModal from "~/components/contact-add";
import type {IContact} from '~/api/types'
import ContactApi from "~/api/contact-api";

export const meta: MetaFunction = () => {
    return [
        {title: "Contacts"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: navStyles}
];

export default function ContactPage() {
    const [filteredData, setFilteredData] = useState<[IContact]>([]);
    const contactEditRef = useRef<HTMLDialogElement>(null);
    const [contacts, setContacts] = useState<[IContact]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const contactsData = await ContactApi.fetchContacts();
            if (contactsData) {
                setContacts(contactsData)
                setFilteredData(contactsData);
            }
        };

        fetchData();
    }, []);

    const handleSearchInputChange = (input: any) => {
        const filtered = contacts.filter(
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

            <ContactTable data={filteredData}/>

        </div>
    );
}
