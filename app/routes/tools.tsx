import type {LinksFunction, MetaFunction} from "@remix-run/node";
import JSONPretty from 'react-json-pretty';
import navStyles from "@navikt/ds-css/dist/index.css";
import {Box, Button, Heading, HGrid, Loader, Page, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import {Buldings3Icon, ComponentIcon, PersonGroupIcon, WrenchIcon} from "@navikt/aksel-icons";
import LayoutHeader from "~/components/layout-header";
import MaintenanceApi from "~/api/maintenance-api";

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
    const [loading, setLoading] = useState(false); // New state for loading
    const JSONPrettyMon = require('react-json-pretty/dist/monikai');

    async function handleChangeButton(title, apiFunction) {
        setSelectedButton(title);
        setLoading(true); // Set loading to true when starting the data fetching
        console.log("data", apiFunction);

        try {
            const result = await apiFunction();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Set loading to false after data fetching completes (whether successful or not)
        }
    }

    return (
        <>
            <LayoutHeader title={"Tools"} icon={WrenchIcon} breadcrumbs={breadcrumbs}/>
            <Box padding="8" paddingBlock="16" as="main">
                <Page.Block gutters width="lg">
                    <VStack gap="4">
                        <HGrid gap="6" columns={5}>
                            <Button
                                icon={<Buldings3Icon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Organizations", MaintenanceApi.getOrganisationConsistency)}
                            >
                                Organizations
                            </Button>

                            <Button
                                icon={<ComponentIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Adapter", MaintenanceApi.getAdapterConsistency)}
                            >
                                Adapter
                            </Button>

                            <Button
                                icon={<PersonGroupIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Client", MaintenanceApi.getClientConsistency)}
                            >
                                Client
                            </Button>

                            <Button
                                icon={<PersonGroupIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Legal", MaintenanceApi.getLegalConsistency)}
                            >
                                Legal
                            </Button>

                            <Button
                                icon={<PersonGroupIcon aria-hidden />}
                                size="small"
                                variant="primary"
                                onClick={() => handleChangeButton("Technical", MaintenanceApi.getTechnicalConsistency)}
                            >
                                Technical
                            </Button>
                        </HGrid>
                        {selectedButton ? (
                            <>
                                <Heading size={"large"}>{selectedButton}</Heading>
                                {loading ? (
                                    <Loader size="3xlarge" title="Venter..." variant="interaction" />
                                    ) : (
                                    <Box padding="2">
                                        <JSONPretty id="json-pretty" data={data} theme={JSONPrettyMon}/>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Heading size={"large"}>Please choose a report to run</Heading>
                        )}
                    </VStack>
                </Page.Block>
            </Box>
        </>
    );
}
