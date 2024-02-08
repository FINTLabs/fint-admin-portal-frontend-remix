import JSONPretty from 'react-json-pretty';
import {Button, Heading, HGrid, Loader, VStack} from "@navikt/ds-react";
import React, {useEffect, useState} from "react";
import {Buldings3Icon, ComponentIcon, PersonGroupIcon} from "@navikt/aksel-icons";
import {json} from "@remix-run/node";
import MaintenanceApi from "~/api/maintenance-api";
import {useFetcher} from "@remix-run/react";

export async function action({ request }) {
        const formData = await request.formData();
        const reportType = formData.get("reportType");
        let data = {};

        switch (reportType) {
            case "Organizations":
                // Handle Organizations report generation here
                console.log("Generating Organizations report");
                data = await MaintenanceApi.getOrganisationConsistency();
                break;
            case "Adapter":
                // Handle Adapter report generation here
                console.log("Generating Adapter report");
                data = (await MaintenanceApi.getAdapterConsistency());
                break;
            case "client":
                // Handle Client report generation here
                data = (await MaintenanceApi.getClientConsistency());
                console.log("Generating Client report");
                break;
            case "legal":
                // Handle Legal report generation here
                data = (await MaintenanceApi.getLegalConsistency());
                console.log("Generating Legal report");
                break;
            case "technical":
                // Handle Technical report generation here
                data = (await MaintenanceApi.getTechnicalConsistency());
                console.log("Generating Technical report");
                break;
            default:
                // Handle unknown reportType or show an error
                console.log("Unknown report type");
        }

        console.log("data", data);
    return json({ data: data, reportType: reportType });

}

export default function ToolsPage() {
    const JSONPrettyMon = require('react-json-pretty/dist/acai');
    const fetcher = useFetcher();
    const data = fetcher.data;
    const reportType = fetcher.data ? fetcher.data.reportType : "";

    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {

        const isLoading = fetcher.state === "submitting" || fetcher.state === "loading";
        setLoadingData(isLoading);

    }, [fetcher.state]);


    return (
        
            <VStack gap="4">
                <fetcher.Form method="post">
                    <HGrid gap="6" columns={5}>

                        <Button
                            type="submit"
                            name="reportType"
                            value="Organizations"
                            icon={<Buldings3Icon aria-hidden />}
                            size="small"
                        >Organizations</Button>

                        <Button
                            type="submit"
                            name="reportType"
                            value="Adapter"
                            icon={<ComponentIcon aria-hidden />}
                            size="small"
                        >Adapter</Button>

                        <Button
                            icon={<PersonGroupIcon aria-hidden />}
                            size="small"
                            variant="primary"
                            name="reportType"
                            value="client"
                        >
                            Client
                        </Button>

                        <Button
                            icon={<PersonGroupIcon aria-hidden />}
                            size="small"
                            variant="primary"
                            name="reportType"
                            value="legal"
                        >
                            Legal
                        </Button>

                        <Button
                            icon={<PersonGroupIcon aria-hidden />}
                            size="small"
                            variant="primary"
                            name="reportType"
                            value="technical"
                        >
                            Technical
                        </Button>



                    </HGrid>
                </fetcher.Form>

                {loadingData ? (
                    <Loader size="3xlarge" title="Venter..." variant="interaction" />
                ) : (!data || data.length === 0) ? (
                    <Heading size={"large"}>Please choose a report to run</Heading>
                ) : (
                    <>
                        <Heading size={"large"}>{reportType}</Heading>

                        <JSONPretty id="json-pretty" data={data.data} theme={JSONPrettyMon}/>

                    </>
                )}

            </VStack>
        
    );
}
