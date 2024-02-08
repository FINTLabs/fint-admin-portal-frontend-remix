import React, {useEffect} from "react";
import type {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {isRouteErrorResponse, useFetcher, useLoaderData, useRouteError, Link} from "@remix-run/react";
import {Alert, BodyLong, Box, Button, Heading, HGrid, Select, Tabs, VStack} from "@navikt/ds-react";
import {ComponentIcon, PencilIcon, PersonGavelIcon, PersonGroupIcon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import ContactApi from "~/api/contact-api";
import OrganizationApi from "~/api/organization-api";
import ComponentApi from "~/api/component-api";
import OrganizationForm from "~/components/organization-form";
import type {IContact} from "~/api/types";
import DeleteConfirm from "~/components/delete-confirm";

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
            OrganizationApi.fetch(),
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

export async function action({ request }) {
    const formData = await request.formData();
    const formValues = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    const actionType = formData.get("actionType");

    console.log("organization actionType:", actionType);

    if (actionType === "delete") {
        const orgName = formData.get("deleteName");
        const response = await OrganizationApi.delete(orgName);
        console.log("delete response:", response);
        return json({ show: true, message: response.message, variant: response.variant });
    }

    if(actionType === "update") {
        try {
            const response = await OrganizationApi.update(formValues);
            return json({ show: true, message: response.message, variant: response.variant });
        } catch (error) {
            return json({ show: true, message: error.message, variant: "error" });
        }
    }

    if(actionType === "setLegalContact") {
        try {
            const orgNumber = formData.get("orgNumber");
            const contactNin = formData.get("contactNin");

            const response = await OrganizationApi.setLegalContact(orgNumber, contactNin);
            return json({ show: true, message: response.message, variant: response.variant });
        } catch (error) {
            return json({ show: true, message: error.message, variant: "error" });
        }
    }

    return json({ show: true, message: "Unknown action type", variant: "error" });
}

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
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        setShow(true);
        console.log("fetcher state:", fetcher.state);
    }, [fetcher.state]);

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
                                Legal Contact Missing
                                <PersonGavelIcon title="Add legal contact"/>
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
                    {fetcher.data && show && (
                        <Alert variant={fetcher.data.variant} closeButton onClose={() => setShow(false)}>
                            {(fetcher.data && fetcher.data.message) || "Content"}
                        </Alert>
                    )}
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
                                placeholder="Select a contact"
                                name={"contactNin"}
                            >
                                {contacts.map((row: IContact, index: number) => (
                                    <option key={index} value={row.nin}>
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
                            <DeleteConfirm
                                deleteName={selectedOrganisation.name}
                                f={fetcher}
                            />
                        </Box>
                    </VStack>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <Box padding="4">
            <Alert variant="info">
                <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Notice!</h1>
                {isRouteErrorResponse(error) ? (
                    <>
                        {error.status === 200 ? (
                            <p>
                                <p>{error.data}</p>
                            </p>
                        ) : (
                            <>
                                <p>Error: {error.status} - {error.statusText}</p>
                                <p>{error.data}</p>
                            </>
                        )}
                    </>
                ) : (
                    <p>{error?.message || "Unknown Error"}</p>
                )}
                <Link to={`/organization/`} style={{ marginTop: "20px" }}>
                    View a list of organizations
                </Link>
            </Alert>
        </Box>
    );
}
