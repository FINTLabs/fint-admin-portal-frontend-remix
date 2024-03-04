import {LinkPanel, Box, VStack} from "@navikt/ds-react";
import {TasklistIcon} from "@navikt/aksel-icons";
import {useLoaderData} from "@remix-run/react";
import type { LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import AccessTemplateApi from "~/api/template-api";

// Define the interface for the data returned by the API
interface TemplateData {
    name: string;
    // Add other properties as necessary
}

// Define the type for the loader's return data for better type checking
type LoaderData = {
    templateData: TemplateData[];
};

export const loader: LoaderFunction = async (): Promise<Response> => {
    const templateData = await AccessTemplateApi.fetchAccessTemplates();

    if (!templateData) {
        throw new Response(`No data found`, {
            status: 404,
        });
    }

    return json({ templateData });
};

export default function AccessPage() {
    // Use the LoaderData type to ensure type safety with useLoaderData
    const { templateData } = useLoaderData<LoaderData>();

    return (
        <VStack gap="4">
            {templateData.map((dataPoint: TemplateData, index: number) => (
                <Box
                    key={index}
                    borderColor="border-alt-3"
                    padding="4"
                    borderWidth="2"
                    borderRadius="xlarge"
                >
                    <LinkPanel border={false} href={`/access/${dataPoint.name}`}>
                        <LinkPanel.Title><TasklistIcon title="a11y-title" fontSize="1.5rem" />{dataPoint.name}</LinkPanel.Title>
                    </LinkPanel>
                </Box>
            ))}
        </VStack>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return <div>Uh oh. I did a whoopsies</div>;
}
