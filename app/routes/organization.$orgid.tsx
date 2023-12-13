import type { MetaFunction, LinksFunction } from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {useLoaderData} from "@remix-run/react";
import {HGrid, VStack, Tabs, Heading} from "@navikt/ds-react";
import {PersonGroupIcon, ComponentIcon, Buldings2Icon, Buldings3Icon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import organisations from '~/api/organisation';
import contacts from '~/api/contacts';
import components from '~/api/components';
import React from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];


export function loader({ params }: { params: { orgid: string } }) {
    const orgNumber = params.orgid;

    const selectedOrganisation =
        organisations.find((org) => org.orgNumber === orgNumber) || null;

    return { selectedOrganisation };
}


export default function OrganizationDetailsPage() {
    const { selectedOrganisation } = useLoaderData<typeof loader>();
    let techContacts, associatedComponents, legalContact;

    if (selectedOrganisation) {
        techContacts = contacts.filter((contact) =>
            selectedOrganisation.techicalContacts.includes(contact.dn)
        );

        associatedComponents = components.filter((component) =>
            component.organisations.includes(selectedOrganisation.dn)
        );

        //TODO: use api to get legal contact
        legalContact =
            contacts.find((contact) => contact.dn === selectedOrganisation?.legalContact);
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Heading size={"small"}>{selectedOrganisation?.displayName}</Heading>
            <HGrid gap="5" columns={2}>
                <VStack>
                    <p>Org Number: {selectedOrganisation?.orgNumber} <br/>
                    Name: {selectedOrganisation?.name} <br/>
                    Primary Asset Id: {selectedOrganisation?.primaryAssetId}</p>
                </VStack>
                <VStack>
                    <Heading size="xsmall">Legal Contact:</Heading>
                    <p>{legalContact?.firstName} {legalContact?.lastName}<br/>
                        {legalContact?.mail}<br/>
                    {legalContact?.mobile}</p>

                </VStack>
            </HGrid>

            <Tabs defaultValue="contacts" selectionFollowsFocus>
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

                </Tabs.List>
                <Tabs.Panel value="contacts" className="h-24 w-full bg-gray-50 p-4">
                    <ContactTable
                        data={techContacts}
                        // isAdding={isAdding}
                        // newContact={newContact}
                        // handleSaveClick={handleSaveClick}
                        // handleCancelClick={handleCancelClick}
                        // handleEditClick={handleEditClick}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="components" className="h-24 w-full bg-gray-50 p-4">
                    <ComponentsTable
                        data={associatedComponents}
                    />
                </Tabs.Panel>

            </Tabs>

        </div>
    );
}
