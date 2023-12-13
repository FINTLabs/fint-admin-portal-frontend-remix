import type { MetaFunction, LinksFunction } from "@remix-run/node";
import JSONPretty from 'react-json-pretty';
import navStyles from "@navikt/ds-css/dist/index.css";
import {Box, Chips, Heading, List, VStack, Button, HGrid, Page} from "@navikt/ds-react";
import React, {useMemo, useState} from "react";
import technicalTools from "~/api/technical-tools";
import {WrenchIcon, ComponentIcon, XMarkOctagonIcon, Buldings3Icon, PersonGroupIcon} from "@navikt/aksel-icons";
import LayoutHeader from "~/components/layout-header";
import {Outlet} from "@remix-run/react";
import organizationTools from "~/api/organization-tools";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

export default function Index() {

    let breadcrumbs = ['Dashboard', 'Organizations'];
    const [selectedButton, setSelectedButton] = useState("");
    const [data, setData] = useState([]);
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');

    function handleChangeButton(title, data) {
        setSelectedButton(title);
        setData(data);
    }

    return (
        <>

            <LayoutHeader title={"Tools"} icon={WrenchIcon} breadcrumbs={breadcrumbs}/>

            <Box
                background="surface-alt-4-moderate"
                padding="8"
                paddingBlock="16"
                as="main"
            >
                <Page.Block gutters width="lg">







                    <VStack gap="4">
                        <HGrid gap="6" columns={5}>
                            <Button
                                icon={<Buldings3Icon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Organizations", organizationTools)}
                            >
                                Organizations
                            </Button>

                            <Button
                                icon={<ComponentIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Adapter", technicalTools)}
                            >
                                Adapter
                            </Button>

                            <Button
                                icon={<ComponentIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => setSelectedButton("Clients")}
                            >
                                Klient
                            </Button>

                            <Button
                                icon={<PersonGroupIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => setSelectedButton("JuridisContact")}
                            >
                                Juridisk kontakt
                            </Button>

                            <Button
                                icon={<PersonGroupIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => setSelectedButton("TechnicalContacts")}
                            >
                                Technical kontakt
                            </Button>

                        </HGrid>
                        {selectedButton ? (
                            <>
                                <Heading size={"3"}>{selectedButton}</Heading>
                                <Box padding="2" >
                                    <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon} />
                                </Box>
                            </>
                        ) : (
                            <Heading size={"3"}>Please choose a report to run</Heading>
                        )}
                    </VStack>












                </Page.Block>
            </Box>
        </>
    );
}
