import React, {useEffect, useRef, useState} from "react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {useLoaderData} from "@remix-run/react";
import {Button, Heading, HGrid, LinkPanel, Tabs, Tag} from "@navikt/ds-react";
import {TokenIcon, TenancyIcon, Buldings3Icon, PencilIcon} from '@navikt/aksel-icons';
import OrganizationTable from "~/components/organization-table";
import ComponentForm from "~/components/component-add";
import type {IComponent, IOrganization} from "~/api/types";
import ComponentApi from "~/api/component-api";
import OrganizationApi from "~/api/organization-api";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

export function loader({ params }: { params: { componentid: string } }) {
    const componentName = params.componentid;

    return { componentName };
}


export default function ComponentPage() {
    const { componentName } = useLoaderData<typeof loader>();
    const editRef = useRef<HTMLDialogElement | null>(null);
    const [selectedComponent, setSelectedComponent] = useState<IComponent>();
    const [associatedOrganisations, setAssociatedOrganisations]  = useState<[IOrganization]>([]);
    const [organizations, setOrganizations] = useState<[IOrganization]>([]);

    useEffect(() => {
        ComponentApi.fetchComponents()
            .then((componentsData) => {
                if (componentsData) {
                    const findOne = componentsData.find((component) => component.name === componentName);
                    console.log(componentName);
                    setSelectedComponent(findOne);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching components:", error);
            });
    }, [componentName]);


    useEffect(() => {
        OrganizationApi.fetchOrganizations()
            .then((organizationData) => {
                if (organizationData) setOrganizations(organizationData);
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching organizations:", error);
            });
    }, []);


    useEffect(() => {
        if (selectedComponent) {
            const filteredOrganisations = organizations.filter((org) =>
                selectedComponent.organisations.includes(org.dn)
            );
            setAssociatedOrganisations(filteredOrganisations);
        }
    }, [selectedComponent, organizations]);

    const handleFormClose = () => {
        // todo: Handle form submission logic
        console.log("closing the modal form");
        editRef.current?.close();
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Heading level="1" size="xlarge">
                {selectedComponent?.name}
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
                <div>
                    <ComponentForm
                        ref={editRef}
                        headerText="Edit Contact Form"
                        onClose={handleFormClose}
                    />
                    <Button
                        onClick={() => editRef.current?.showModal()}
                        icon={<PencilIcon aria-hidden />}
                        size="xsmall"
                    >
                        Edit Component
                    </Button>

                </div>
            </HGrid>


            <Tabs defaultValue="logg">
                <Tabs.List>
                    <Tabs.Tab
                        value="logg"
                        label="Organizations"
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
                </Tabs.List>
                <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-4">
                    <OrganizationTable data={associatedOrganisations} />
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
            </Tabs>




        </div>
    );
}