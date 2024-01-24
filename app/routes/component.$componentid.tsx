import React from "react";
import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Box, Heading, HGrid, LinkPanel, Tabs, Tag} from "@navikt/ds-react";
import {TokenIcon, TenancyIcon, Buldings3Icon, PencilIcon} from '@navikt/aksel-icons';
import OrganizationTable from "~/components/organization-table";
import ComponentApi from "~/api/component-api";
import OrganizationApi from "~/api/organization-api";
import ComponentForm from "~/components/component-form";
import DeleteButton from "~/components/delete-button";
import {json} from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
    const componentName = params.componentid;

    try {
        const componentsPromise = ComponentApi.fetchComponentsByName(componentName);
        const organizationsPromise = OrganizationApi.fetchOrganizations();

        const [selectedComponent, organizations] = await Promise.all([componentsPromise, organizationsPromise]);

        // Filter organizations if selectedComponent is not null and has 'organisations'
        const associatedOrganizations = selectedComponent && selectedComponent.organisations
            ? organizations.filter(org => selectedComponent.organisations.includes(org.dn))
            : [];

        return json({ selectedComponent, organizations, associatedOrganizations });
    } catch (error) {
        console.error("Error in loader fetching data:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

//TODO: Ask to save changes on tab change ?

export default function ComponentPage() {

    const navigate = useNavigate();
    const { selectedComponent, associatedOrganizations } = useLoaderData();

    const handleDeleteConfirm = (isConfirmed) => {
        if (isConfirmed) {
            console.log('Deletion confirmed');
            navigate('/component');
        } else {
            console.log('Deletion canceled');
        }
    };

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

                    <Box padding="8">

                        <Box
                            background="surface-subtle"
                            borderColor="border-alt-3"
                            padding="4"
                            borderWidth="2"
                            borderRadius="xlarge"
                        >
                            <ComponentForm selectedComponent={selectedComponent} />
                        </Box>

                        <Box padding={"3"}>
                            <DeleteButton
                                onClose={handleDeleteConfirm}
                                buttonText={"Delete Component"}
                            />
                        </Box>

                    </Box>

                </Tabs.Panel>
            </Tabs>




        </div>
    );
}