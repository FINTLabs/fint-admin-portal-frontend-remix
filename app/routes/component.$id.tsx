//component.$componentid.tsx
import React, {useEffect} from "react";
import type {ActionFunctionArgs, LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {isRouteErrorResponse, useFetcher, useLoaderData, useRouteError} from "@remix-run/react";
import {Alert, Box, Heading, HGrid, LinkPanel, Tabs, Tag, VStack} from "@navikt/ds-react";
import {Buldings3Icon, PencilIcon, TenancyIcon, TokenIcon} from '@navikt/aksel-icons';
import OrganizationTable from "~/components/organization-table";
import ComponentApi from "~/api/component-api";
import OrganizationApi from "~/api/organization-api";
import ComponentForm from "~/components/component-form";
import {IFetcherResponseData} from "~/api/types";
import ConfirmAction from "~/components/confirm-action";

export const loader: LoaderFunction = async ({ params }) => {
    const componentName = params.id;

    try {
        const componentsPromise = ComponentApi.fetchComponentsByName(componentName);

        const organizationsPromise = OrganizationApi.fetch();

        const [selectedComponent, organizations] = await Promise.all([componentsPromise, organizationsPromise]);

        // Filter organizations if selectedComponent is not null and has 'organizations'
        const associatedOrganizations = selectedComponent && selectedComponent.organisations
            ? organizations.filter((org: { dn: string; }) => selectedComponent.organisations.includes(org.dn))
            : [];

        return json({ selectedComponent, organizations, associatedOrganizations });
    } catch (error) {
        console.error("Error in loader fetching data:", error);
        throw new Response("Component Not Found", { status: 404 });
    }
};

export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData();
    const formValues: Record<string, string | boolean> = {};

    for (const [key, value] of formData) {
        if(value === "on") {
            formValues[key] = true;
            continue;
        }
        formValues[key] = value as string;
    }
    const actionType = formData.get("actionType");


    let response;
    switch (actionType) {
        case "update":
            response = await ComponentApi.update(formValues, formValues["name"] as string);
            break;
        case "delete":
            response = await ComponentApi.delete(formValues["deleteName"] as string);
            break;
        default:
            return json({show: true, message: "Unknown action type", variant: "error"});
    }

    return json({show: true, message: response?.message, variant: response?.variant});
}

//TODO: Ask to save changes on tab change ?

export default function ComponentPage() {

    const { selectedComponent, associatedOrganizations } = useLoaderData<typeof loader>();
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();
    const actionData = fetcher.data as IFetcherResponseData;

    useEffect(() => {
        setShow(true);
    }, [fetcher.state]);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Heading level="1" size="xlarge">
                {selectedComponent?.name}
            </Heading>
            <Heading level="1" size="small">
                {selectedComponent?.description}
            </Heading>

            <HGrid columns={2}>
                <div>
                    <Heading level="2" size="small">Server:</Heading>

                    {selectedComponent?.inPlayWithFint && (
                        <Tag size="small" variant="alt1">PWF</Tag>
                    )}

                    {selectedComponent?.inBeta && (
                        <Tag size="small" variant="alt1">Beta</Tag>
                    )}

                    {selectedComponent?.inProduction && (
                        <Tag size="small" variant="alt1">API</Tag>
                    )}

                    <Heading level="1" size="small">Type:</Heading>

                    {selectedComponent?.openData && (
                        <Tag size="small" variant="alt3">Open</Tag>
                    )}
                    {selectedComponent?.common && (
                        <Tag size="small" variant="alt3">Common</Tag>
                    )}
                    {selectedComponent?.core && (
                        <Tag size="small" variant="alt3">Core</Tag>
                    )}

                </div>
            </HGrid>


            <Tabs defaultValue="logg">
                <Tabs.List>
                    <Tabs.Tab
                        value="logg"
                        label={`Organizations (${associatedOrganizations.length})`}
                        icon={<Buldings3Icon title="historielogg" />}
                    />
                    <Tabs.Tab
                        value="inbox"
                        label="Endpoints"
                        icon={<TenancyIcon title="inbox" />}
                    />
                    <Tabs.Tab
                        value="sendt"
                        label="Swagger"
                        icon={<TokenIcon title="sendt" />}
                    />
                    <Tabs.Tab
                        value="edit"
                        label="Edit Component"
                        icon={<PencilIcon title="Edit" />}
                        />
                </Tabs.List>
                <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-4">
                    <OrganizationTable data={associatedOrganizations} />
                </Tabs.Panel>
                <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">

                    {selectedComponent?.inPlayWithFint && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>Play With Fint</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://pwf.felleskomponent.no${selectedComponent?.basePath}`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}

                    {selectedComponent?.inBeta && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>Beta</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://beta.felleskomponent.no${selectedComponent?.basePath}`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}

                    {selectedComponent?.inProduction && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>API (Production)</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://felleskomponent.no${selectedComponent?.basePath}`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}

                </Tabs.Panel>
                <Tabs.Panel value="sendt" className="h-24  w-full bg-gray-50 p-4">

                    {selectedComponent?.inPlayWithFint && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>Play With Fint</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://pwf.felleskomponent.no${selectedComponent?.basePath}/swagger-ui.html`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}

                    {selectedComponent?.inBeta && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>Beta</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://beta.felleskomponent.no${selectedComponent?.basePath}/swagger-ui.html`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}

                    {selectedComponent?.inProduction && (
                        <LinkPanel border={false} href="#">
                            <LinkPanel.Title>API (Production)</LinkPanel.Title>
                            <LinkPanel.Description>
                                {`https://api.felleskomponent.no${selectedComponent.basePath}/swagger-ui.html`}
                            </LinkPanel.Description>
                        </LinkPanel>
                    )}


                </Tabs.Panel>

                <Tabs.Panel value="edit" className="h-24  w-full bg-gray-50 p-4">

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
                            <ComponentForm
                                selectedComponent={selectedComponent}
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

                            <ConfirmAction
                                actionText="Slett"
                                targetName={selectedComponent.name}
                                f={fetcher}
                                actionType="delete"
                                confirmationText={`Slette komponent:`}
                                additionalInputs={[
                                    { name: "componentName", value: selectedComponent.displayName },
                                    { name: "dn", value: selectedComponent.dn }
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

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}