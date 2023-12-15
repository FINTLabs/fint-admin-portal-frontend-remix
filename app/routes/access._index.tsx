import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {LinkPanel, Box, VStack} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import {TasklistIcon} from "@navikt/aksel-icons";
import {useEffect, useState} from "react";
import AccessTemplateApi from "~/api/template-api";
import type {IOrganization} from "~/api/types";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

export default function AccessPage() {

    const [template, setTemplate] = useState<IOrganization[]>([]);

    useEffect(() => {
        AccessTemplateApi.fetchAccessTemplates()
            .then((templateData) => {
                if (templateData) {
                    setTemplate(templateData);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching access templates:", error);
            });
    }, []);

    
    return (
        <VStack gap="4">
            {template.map((dataPoint, index) => (
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
