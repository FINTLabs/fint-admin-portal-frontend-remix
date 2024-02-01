import React, { useRef, useState} from "react";
import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Heading, HGrid, Tabs, VStack} from "@navikt/ds-react";
import {ComponentIcon, PersonGroupIcon, PencilIcon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import ContactApi from "~/api/contact-api";
import OrganizationApi from "~/api/organization-api";
import ComponentApi from "~/api/component-api";
import CustomFormModal from "~/components/organization-form";
import {json} from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
    const orgNumber = params.orgid;

    try {
        const selectedOrganisation = await OrganizationApi.fetchOrganizationByOrgNumber(orgNumber);

        const [
            organizations,
            legalContact,
            components,
            contacts
        ] = await Promise.all([
            OrganizationApi.fetchOrganizations(),
            OrganizationApi.fetchLegalContact(selectedOrganisation),
            ComponentApi.fetchComponentsByOrganization(selectedOrganisation),
            ContactApi.fetchTechnicalContactsByOrganization(selectedOrganisation)
        ]);

        return json({
            selectedOrganisation,
            organizations,
            legalContact,
            components,
            contacts
        });
    } catch (error) {
        console.error("Error fetching organization details data:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

export default function OrganizationDetailsPage() {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const {
        selectedOrganisation,
        organizations,
        legalContact,
        components,
        contacts
    } = useLoaderData();

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
                        label={`Contacts (${contacts.length})`}
                        icon={<PersonGroupIcon title="contacts" />}
                    />
                    <Tabs.Tab
                        value="components"
                        label={`Components (${components.length})`}
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
                        <ContactTable data={contacts} organizations={organizations} />
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
