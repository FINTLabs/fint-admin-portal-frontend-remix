import React, {useEffect, useRef, useState} from "react";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {useLoaderData} from "@remix-run/react";
import {Heading, HGrid, Tabs, VStack, Button} from "@navikt/ds-react";
import {ComponentIcon, PersonGroupIcon, PencilIcon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import ContactApi from "~/api/contact-api";
import type {IComponent, IContact} from "~/api/types";
import OrganizationApi from "~/api/organization-api";
import ComponentApi from "~/api/component-api";
import CustomFormModal from "~/components/organization-add";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles },
];

export async function loader({params}: { params: { orgid: string } }) {
    const orgNumber = params.orgid;

    const selectedOrganisation = await OrganizationApi.fetchOrganizationByOrgNumber(orgNumber);

    return {selectedOrganisation};
}

export default function OrganizationDetailsPage() {
    const { selectedOrganisation } = useLoaderData<typeof loader>();
    const [legalContact, setLegalContact] = useState<IContact | null>(null);
    const [contacts, setContacts] = useState<[IContact]>([]);
    const [components, setComponents] = useState<[IComponent]>([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleEditTabClick = () => {
        // Open the modal when the "Edit Org" tab is clicked
        modalRef.current?.showModal();
        console.log("and now here")
        setEditModalOpen(true);
    };

    const handleCloseModal = () => {
        // Close the modal
        setEditModalOpen(false);
    };

    //TODO: add a loading function so that old contacts and components do not show during load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const contactsData = await ContactApi.fetchContacts();
                if (contactsData) {
                    setContacts(contactsData);
                }

                const legalData = await OrganizationApi.fetchLegalContact(selectedOrganisation);
                if (legalData) {
                    setLegalContact(legalData);
                }

                const componentsData = await ComponentApi.fetchComponentsByOrganization(selectedOrganisation);
                if (componentsData) {
                    setComponents(componentsData);
                }

                const techContactsData = await ContactApi.fetchTechnicalContactsByOrganization(selectedOrganisation);
                if(techContactsData) {
                    setContacts(techContactsData);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedOrganisation]);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Heading size={"small"}>{selectedOrganisation?.displayName}</Heading>
            <HGrid gap="5" columns={2}>
                <VStack>
                    <p>Org Number: {selectedOrganisation?.orgNumber} <br />
                        Name: {selectedOrganisation?.name} <br />
                        Primary Asset Id: {selectedOrganisation?.primaryAssetId}</p>
                </VStack>
                <VStack>
                    <Heading size="xsmall">Legal Contact:</Heading>
                    <p>{legalContact?.firstName} {legalContact?.lastName}<br />
                        {legalContact?.mail}<br />
                        {legalContact?.mobile}</p>

                </VStack>
            </HGrid>

            <Tabs defaultValue="contacts" selectionFollowsFocus
                  onChange={(tab) => {
                      if (tab === "edit") {
                          handleEditTabClick();
                          console.log("hello world")
                      }
                  }}
            >
                <Tabs.List>
                    <Tabs.Tab
                        value="contacts"
                        label="Contacts"
                        icon={<PersonGroupIcon title="contacts" />}
                    />
                    <Tabs.Tab
                        value="components"
                        label="Components"
                        icon={<ComponentIcon title="component" />}
                    />

                    <Tabs.Tab
                        value="edit"
                        label="Edit Org"
                        icon={<PencilIcon title="edit" />}
                    />

                </Tabs.List>
                <Tabs.Panel value="contacts" className="h-24 w-full bg-gray-50 p-4">
                    {contacts && contacts.length > 0 ? (
                        <ContactTable data={contacts} />
                    ) : (
                        <p>No contacts</p>
                    )}
                </Tabs.Panel>

                <Tabs.Panel value="components" className="h-24 w-full bg-gray-50 p-4">
                    <ComponentsTable
                        data={components}
                    />
                </Tabs.Panel>

                <Tabs.Panel value="edit" className="h-24 w-full bg-gray-50 p-4">
                    <p>organization edit form here??</p>
                </Tabs.Panel>

            </Tabs>
            <CustomFormModal
                ref={modalRef}
                headerText="Edit Organization Form"
                onClose={handleCloseModal}
                selectedOrganization={selectedOrganisation}
            />
        </div>
    );
}
