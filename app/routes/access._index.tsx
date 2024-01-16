// access_index.tsx
import {LinkPanel, Box, VStack} from "@navikt/ds-react";
import {TasklistIcon} from "@navikt/aksel-icons";
import {useLoaderData} from "@remix-run/react";
import type { LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import AccessTemplateApi from "~/api/template-api";

export const loader: LoaderFunction = async () => {
        const templateData = await AccessTemplateApi.fetchAccessTemplates();

        if(!templateData) {
            throw new Response(`No data found `, {
                status: 404,
            });
        }

        return json({ templateData });
};

export default function AccessPage() {

    const { templateData } = useLoaderData<typeof loader>();

    return (
        <VStack gap="4">
            {templateData.map((dataPoint, index) => (
                <Box
                    key={index}
                    // background="surface-subtle"
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
