
// app/routes/tools.tsx
import { useFetcher } from '@remix-run/react';
import 'react-json-pretty/themes/acai.css';
import { Button, Heading, HGrid, Loader, VStack } from "@navikt/ds-react";
import { Buildings3Icon, ComponentIcon, PersonGroupIcon } from "@navikt/aksel-icons";
import MaintenanceApi from "~/api/maintenance-api";
import JSONPretty from "react-json-pretty";
import {ActionFunction, json} from "@remix-run/node";

interface FetcherResponse {
    reportType?: string;
    data?: any; // Adjust this according to the actual data structure
}

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const reportType = formData.get("reportType");

    let data;
    switch (reportType) {
        case "Organizations":
            data = await MaintenanceApi.getOrganisationConsistency();
            break;
        case "Adapter":
            data = await MaintenanceApi.getAdapterConsistency();
            break;
        case "Client":
            data = await MaintenanceApi.getAdapterConsistency();
            break;
        case "Legal":
            data = await MaintenanceApi.getAdapterConsistency();
            break;
        case "Technical":
            data = await MaintenanceApi.getAdapterConsistency();
            break;
        default:
            console.info("Unknown report type");
            data = null;
    }

    return json({ data, reportType });
};

export default function ToolsPage() {
    const fetcher = useFetcher<FetcherResponse>();
    const isLoading = fetcher.state === "submitting" || fetcher.state === "loading";
    const JSONPrettyMon = require('react-json-pretty/dist/acai');

    return (
        <VStack gap="4">
            <fetcher.Form method="post">
                <HGrid gap="6" columns={5}>
                    <Button type="submit" name="reportType" value="Organizations" icon={<Buildings3Icon aria-hidden />} size="small">Organizations</Button>
                    <Button type="submit" name="reportType" value="Adapter" icon={<ComponentIcon aria-hidden />} size="small">Adapter</Button>
                    <Button type="submit" name="reportType" value="Client" icon={<PersonGroupIcon aria-hidden />} size="small">Client</Button>
                    <Button type="submit" name="reportType" value="Legal" icon={<PersonGroupIcon aria-hidden />} size="small">Legal</Button>
                    <Button type="submit" name="reportType" value="Technical" icon={<PersonGroupIcon aria-hidden />} size="small">Technical</Button>
                </HGrid>
            </fetcher.Form>

            {isLoading ? (
                <Loader size="3xlarge" title="Venter..." variant="interaction" />
            ) : fetcher.data?.data ? (
                <>
                    <Heading size="large">{fetcher.data.reportType}</Heading>
                    <JSONPretty id="json-pretty" data={fetcher.data.data} theme={JSONPrettyMon} />
                </>
            ) : (
                <Heading size="large">Please choose a report to run</Heading>
            )}
        </VStack>
    );
}
