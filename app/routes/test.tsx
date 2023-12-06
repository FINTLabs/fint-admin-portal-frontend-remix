import {
    ChevronDownCircleIcon,
    ChevronUpCircleIcon,
    ChevronUpDoubleCircleIcon,
    ExclamationmarkTriangleIcon,
    ExternalLinkIcon,
    LinkIcon
} from "@navikt/aksel-icons";
import {
    BodyLong,
    Box,
    CopyButton,
    HGrid,
    Heading,
    Hide,
    Label,
    Link,
    List,
    Show,
    VStack, Button, ExpansionCard, Popover,
} from "@navikt/ds-react";
import cl from "clsx";
import navStyles from "@navikt/ds-css/dist/index.css";
import {LinksFunction} from "@remix-run/node";
import {useRef, useState} from "react";
import styled from "styled-components";
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

const StyledExpansionPanel = styled(ExpansionCard)`
  /* Add your custom styling for the ExpansionCard component here */
  /* For example: */
  z-index: 2000;
  /* Add any other styling as needed */
`;

const Example = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    return (
        <>
            <Button
                ref={buttonRef}
                onClick={() => setOpenState(!openState)}
                aria-expanded={openState}
            >
                Åpne popover
            </Button>

            <Popover
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={buttonRef.current}
                offset={0}
                arrow={false}
                placement="bottom"
            >
                <Popover.Content>

                    <List>
                        <List.Item
                            title="Kritisk"
                            icon={<ExclamationmarkTriangleIcon aria-hidden />}
                        >
                            dette er problemer som må løses så fort som mulig. De hindrer bruk av
                            siden og kan i verste fall være farlig for bruker.
                        </List.Item>
                        <List.Item title="Høy" icon={<ChevronUpDoubleCircleIcon aria-hidden />}>
                            brukere er forhindret i å forstå innholdet eller utføre kritiske
                            oppgaver, og det finnes ingen alternative løsninger.
                        </List.Item>
                        <List.Item title="Medium" icon={<ChevronUpCircleIcon aria-hidden />}>
                            vanskelige, tidkrevende eller frustrerende for brukere å få tilgang til
                            innhold eller funksjonalitet.
                        </List.Item>
                        <List.Item title="Lav" icon={<ChevronDownCircleIcon aria-hidden />}>
                            brukeren få tilgang til alt innhold og funksjonalitet, men
                            brukeropplevelsen er dårlig.
                        </List.Item>
                    </List>


                </Popover.Content>
            </Popover>
        </>
    );
};

export default Example;