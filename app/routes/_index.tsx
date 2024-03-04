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
import {
    Buldings3Icon,
    ComponentIcon,
    LinkIcon,
    PersonGroupIcon,
    ExternalLinkIcon,
} from "@navikt/aksel-icons";
import {Link} from "@remix-run/react";
interface LinkItem {
    name: string;
    url: string;
}

export default function Dashboard() {
    const links = [
        {name: "Play with Fint", url: "https://play-with-fint.felleskomponent.no/"},
        {name: "Information Model", url: "https://informasjonsmodell.felleskomponent.no/"},
        {name: "Fint Labs", url: "https://iman.fintlabs.no/"},
        {name: "IdP Felleskomponent", url: "https://idp.felleskomponent.no/nidp/portal?locale=nb_NO"},
        {name: "Avien", url: "https://console.azure.avien.io/"},
        // Add more links as needed
    ];

    const convertLinksToObjectComponents = (links: LinkItem[]) => {
        return links.map((link, index) => (
            <BodyShort key={index}>
                <Link to={link.url}>
                    {link.name} <ExternalLinkIcon title="a11y-title" fontSize="1.5rem"/>
                </Link>
            </BodyShort>
        ));
    };

    const linkComponents = convertLinksToObjectComponents(links);

    return (
        <>

            <Page.Block gutters width="lg">
                <VStack gap="4">
                    <Box padding="4">
                        <HStack gap="3" justify="center">
                            <LinkPanel href="/contact" border>
                                <LinkPanel.Title>
                                    <PersonGroupIcon  title="a11y-title" fontSize="1.5rem"/> Kontakter
                                </LinkPanel.Title>
                                <LinkPanel.Description>Vis en liste over kontakter</LinkPanel.Description>
                            </LinkPanel>

                            <LinkPanel href="/organization" border>
                                <LinkPanel.Title>
                                    <Buldings3Icon title="a11y-title" fontSize="1.5rem"/> Organisasjoner
                                </LinkPanel.Title>
                                <LinkPanel.Description>Vis en liste over organisasjoner</LinkPanel.Description>
                            </LinkPanel>

                            <LinkPanel href="/component" border>
                                <LinkPanel.Title>
                                    <ComponentIcon title="a11y-title" fontSize="1.5rem"/> Komponenter
                                </LinkPanel.Title>
                                <LinkPanel.Description>Vis en liste over komponenter</LinkPanel.Description>
                            </LinkPanel>

                        </HStack>
                    </Box>


                    <Box padding="4">
                        <Alert variant="info">
                            Here is a test of the alert box thing. This is just a test. Testing is fun. Oh, and Hello
                            world! From index
                        </Alert>
                    </Box>

                    <GuidePanel illustration={<LinkIcon title="a11y-title" fontSize="1.5rem"/>}>
                        <Box padding="4">
                            {linkComponents}
                        </Box>

                    </GuidePanel>
                </VStack>

            </Page.Block>
        </>
    );
}
