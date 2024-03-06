import React, {useEffect} from "react";
import type {ActionFunctionArgs, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {isRouteErrorResponse, useFetcher, useLoaderData, useRouteError} from "@remix-run/react";
import {Alert, BodyLong, Box, Heading, HGrid, Select, Tabs, VStack} from "@navikt/ds-react";
import {ComponentIcon, PencilIcon, PersonGavelIcon, PersonGroupIcon} from '@navikt/aksel-icons';
import ComponentsTable from "~/components/components-table";
import ContactTable from "~/components/contacts-table";
import ContactApi from "~/api/contact-api";
import OrganizationApi from "~/api/organization-api";
import ComponentApi from "~/api/component-api";
import OrganizationForm from "~/components/organization-form";
import ConfirmAction from "~/components/confirm-action";
import {IContact, IFetcherResponseData} from "~/api/types";

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
            OrganizationApi.fetchLegalContact(selectedOrganisation.name),
            ComponentApi.fetchComponentsByOrganization(selectedOrganisation.dn),
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

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const formValues: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    const actionType = formData.get("actionType");

    let response;
    switch (actionType) {
        case "update":
            response = await OrganizationApi.update(formValues, formValues["name"] as string);
            break;
        case "delete":
            response = await OrganizationApi.delete(formData.get("deleteName") as string);
            break;
        case "setLegalContact":
            response = await OrganizationApi.setLegalContact(formData.get("orgName") as string, formData.get("contactNin") as string);
            break;
        default:
            return json({show: true, message: "Unknown action type", variant: "error"});
    }

    return json({show: true, message: response?.message, variant: response?.variant});
}
export default function OrganizationDetailsPage() {

    const {
        selectedOrganisation,
        organizations,
        legalContact,
        components,
        contacts
    } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const hasLegalContact = legalContact && legalContact.firstName && legalContact.firstName.trim() !== '';
    const [show, setShow] = React.useState(false);
    const [newLegalContact, setNewLegalContact] = React.useState({ nin: '', fullName: '' });
    const actionData = fetcher.data as IFetcherResponseData;

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
                            f={null}
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
                    {actionData && show && (
                        <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton onClose={() => setShow(false)}>
                            {actionData.message || "Content"}
                        </Alert>
                    )}
                    <VStack gap="4">

                        <Box
                            className={"inputForm"}
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
                            className={"inputForm"}
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                            <Select
                                label="Oppdater juridisk kontakt"
                                description="Velg en kontakt fra listen"
                                placeholder="Velg en kontakt"
                                name={"contactNin"}
                                onChange={(e) => {
                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                    const fullName = selectedOption.text;
                                    const nin = e.target.value;
                                    setNewLegalContact({ nin, fullName });
                                }}
                            >
                                <option key={0} value={""} />
                                {contacts.map((row:IContact, index:any) => (
                                    <option key={index} value={row.nin}>
                                        {row.firstName} {row.lastName}
                                    </option>
                                ))}
                            </Select>

                            <Box padding={"4"} >
                                <ConfirmAction
                                    actionText="Rediger"
                                    targetName={newLegalContact.fullName}
                                    f={fetcher}
                                    actionType="setLegalContact"
                                    confirmationText={`Sette ny juridisk kontakt til:`}
                                    additionalInputs={[
                                        { name: "orgName", value: selectedOrganisation.name },
                                        { name: "contactNin", value: newLegalContact.nin }
                                    ]}
                                />
                            </Box>


                        </Box>

                        <Box
                            className={"inputForm"}
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                            <ConfirmAction
                                actionText="Slett"
                                targetName={selectedOrganisation.name}
                                f={fetcher}
                                actionType="delete"
                                confirmationText={`Slette organisasjonen:`}
                                additionalInputs={[
                                    { name: "orgName", value: selectedOrganisation.displayName },
                                    { name: "dn", value: selectedOrganisation.dn }
                                ]}
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

    // Handle route-specific errors
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                {/* Ensure error.data is displayed correctly, might need JSON.stringify if it's an object */}
                <p>{typeof error.data === 'string' ? error.data : JSON.stringify(error.data)}</p>
            </div>
        );
    } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                {/* Ensure stack is a string or provide a default message */}
                <pre>{error.stack || 'No stack trace available'}</pre>
            </div>
        );
    } else {
        // Fallback for unknown error types
        return <h1>Unknown Error</h1>;
    }
}
