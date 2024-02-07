import React, {useState} from "react";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import {BodyLong, Box, Button, ConfirmationPanel, Heading, HGrid, Link, Select, Tabs, VStack} from "@navikt/ds-react";
import {ComponentIcon, PencilIcon, PersonGavelIcon, PersonGroupIcon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import ContactApi from "~/api/contact-api";
import OrganizationApi from "~/api/organization-api";
import ComponentApi from "~/api/component-api";
import OrganizationForm from "~/components/organization-form";
import type {IContact} from "~/api/types";

export const loader: LoaderFunction = async ({params}) => {
    const orgNumber = params.id;

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
        throw new Response("Not Found", {status: 404});
    }
};

export default function OrganizationDetailsPage() {

    const {
        selectedOrganisation,
        organizations,
        legalContact,
        components,
        contacts
    } = useLoaderData();
    const fetcher = useFetcher();
    const hasLegalContact = legalContact && legalContact.firstName && legalContact.firstName.trim() !== '';
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <Heading size={"small"}>{selectedOrganisation?.displayName}</Heading>
            <HGrid gap="5" columns={2}>
                <VStack>
                    <p>Org Number: {selectedOrganisation?.orgNumber} <br/>
                        Name: {selectedOrganisation?.name} <br/>
                        Primary Asset Id: {selectedOrganisation?.primaryAssetId}</p>
                </VStack>
                <VStack>
                    <Heading size="xsmall">Legal Contact:</Heading>
                    {hasLegalContact ? (
                        <BodyLong>
                            {legalContact.firstName} {legalContact.lastName}<br/>
                            {legalContact.mail}<br/>
                            {legalContact.mobile}
                        </BodyLong>
                    ) : (
                        <BodyLong>
                            <Link href="#">
                                Legal Contact Missing
                                <PersonGavelIcon title="Add legal contact"/>
                            </Link>
                        </BodyLong>
                    )}

                </VStack>
            </HGrid>

            <Tabs defaultValue="contacts" selectionFollowsFocus>
                <Tabs.List>
                    <Tabs.Tab
                        value="contacts"
                        label={`Contacts (${contacts.length})`}
                        icon={<PersonGroupIcon title="contacts"/>}
                    />
                    <Tabs.Tab
                        value="components"
                        label={`Components (${components.length})`}
                        icon={<ComponentIcon title="component"/>}
                    />

                    <Tabs.Tab
                        value="edit"
                        label="Edit Org"
                        icon={<PencilIcon title="edit"/>}
                    />

                </Tabs.List>
                <Tabs.Panel value="contacts" className="h-24 w-full bg-gray-50 p-4">
                    {contacts && contacts.length > 0 ? (
                        <ContactTable
                            data={contacts}
                            organizations={organizations}
                            editable={false}
                            legalContactDn={legalContact?.dn}
                        />
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
                    <VStack gap="4">

                        <Box
                            background="surface-subtle"
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                            <OrganizationForm
                                selected={selectedOrganisation}
                                f={fetcher}
                            />
                        </Box>

                        <Box
                            background="surface-subtle"
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                            <Select
                                label="Update legal contact"
                                description="Select a contact from the list"
                            >
                                {contacts.map((row: IContact, index: number) => (
                                    <option key={index} value={row.dn}>
                                        {row.firstName} {row.lastName}
                                    </option>
                                ))}

                            </Select>
                            <Box padding={"4"} >
                                <Button
                                    icon={<PencilIcon aria-hidden />}
                                    size="xsmall"
                                >
                                    Rediger
                                </Button>
                            </Box>
                        </Box>

                        <Box
                            background="surface-subtle"
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                        <ConfirmationPanel
                            checked={confirmDelete}
                            label="I am really sure I want to delete this organization. This action cannot be undone."
                            onChange={() => setConfirmDelete((x) => !x)}
                        >
                            <Heading level="2" size="xsmall">
                                Delete Organization
                            </Heading>
                        </ConfirmationPanel>
                            <Button
                                variant="danger"
                                size="xsmall"
                                onClick={() => setConfirmDelete(true)}
                                disabled={!confirmDelete}
                            >
                                Delete Organization
                            </Button>
                        </Box>
                    </VStack>
                </Tabs.Panel>

            </Tabs>

        </div>
    );
}
