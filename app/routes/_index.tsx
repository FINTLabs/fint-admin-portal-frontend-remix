import type {MetaFunction, LinksFunction} from "@remix-run/node";
import {
    Alert,
    BodyShort,
    Box,
    GuidePanel,
    HStack,
    LinkPanel,
    VStack,
    Page,
} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import {
    Buldings3Icon,
    ComponentIcon,
    LinkIcon,
    PersonGroupIcon,
    ExternalLinkIcon,
} from "@navikt/aksel-icons";
import {Link} from "@remix-run/react";

// export const meta: MetaFunction = () => {
//     return [
//         {title: "Admin Portal Dashboard"},
//         {name: "description", content: "Welcome to Remix!"},
//     ];
// };
// export const links: LinksFunction = () => [
//     {rel: "stylesheet", href: navStyles}
// ];

export default function Dashboard() {
    const links = [
        { name: "Play with Fint", url: "https://play-with-fint.felleskomponent.no/" },
        { name: "Information Model", url: "https://informasjonsmodell.felleskomponent.no/" },
        { name: "Fint Labs", url: "https://iman.fintlabs.no/" },
        { name: "IdP Felleskomponent", url: "https://idp.felleskomponent.no/nidp/portal?locale=nb_NO" },
        // Add more links as needed
    ];

    const convertLinksToObjectComponents = (links) => {
        return links.map((link, index) => (
            <BodyShort key={index}>
                <Link to={link.url}>
                    {link.name} <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" />
                </Link>
            </BodyShort>
        ));
    };

    const linkComponents = convertLinksToObjectComponents(links);

    return (
        <>
            
            <Page.Block gutters width="lg" >
                <VStack gap="4">
                    <Box padding="4">
                        <HStack gap="3" justify="center">
                            <LinkPanel href="/contact" border>
                                <LinkPanel.Title><PersonGroupIcon title="a11y-title"
                                                                  fontSize="1.5rem"/> Contacts</LinkPanel.Title>
                                <LinkPanel.Description>View a list of contacts</LinkPanel.Description>
                            </LinkPanel>

                            <LinkPanel href="/organization" border>
                                <LinkPanel.Title><Buldings3Icon title="a11y-title"
                                                                fontSize="1.5rem"/> Organization</LinkPanel.Title>
                                <LinkPanel.Description>View a list of organizations</LinkPanel.Description>
                            </LinkPanel>

                            <LinkPanel href="/component" border>
                                <LinkPanel.Title><ComponentIcon title="a11y-title"
                                                                fontSize="1.5rem"/> Components</LinkPanel.Title>
                                <LinkPanel.Description>View a list of components</LinkPanel.Description>
                            </LinkPanel>

                        </HStack>
                    </Box>


                    <Box padding="4">
                        <Alert variant="info">
                            Here is a test of the alert box thing. This is just a test. Testing is fun. Oh, and Hello world! From index
                        </Alert>
                    </Box>


                    <GuidePanel poster illustration={<LinkIcon title="a11y-title" fontSize="1.5rem" />}>
                        <Box padding="4" >
                            {linkComponents}
                        </Box>

                    </GuidePanel>

                    {/*https://iman.fintlabs.no/*/}
                    {/*https://idp.felleskomponent.no/nidp/portal?locale=nb_NO*/}
                    {/*https://fintlabs.atlassian.net/jira/projects?selectedProjectType=software*/}
                    {/*https://fintlabs.atlassian.net/wiki/home*/}
                    {/*https://grafana.fintlabs.no/*/}
                    {/*https://github.com/FINTLabs*/}
                    {/*https://fintlabs.zendesk.com/agent/dashboard*/}
                    {/*https://unleash-beta.fintlabs.no/login (edited)*/}
                </VStack>

                {/*<Box padding="4" background="surface-success-subtle">*/}
                {/*    <Alert variant="info">*/}
                {/*        Here is a test of the alert box thing. This is just a test. Testing is fun. Oh, and Hello world!*/}
                {/*    </Alert>*/}
                {/*</Box>*/}
            </Page.Block>
        </>
    );
}
