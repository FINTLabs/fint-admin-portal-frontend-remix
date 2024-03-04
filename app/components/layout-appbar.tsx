import React, {useRef, useState} from "react";
import {BodyShort, Box, Button, Heading, HGrid, Hide, HStack, LinkPanel, Popover} from "@navikt/ds-react";
import {
    Buldings3Icon,
    ComponentIcon,
    LeaveIcon,
    MenuHamburgerIcon,
    PackageIcon,
    PersonGroupIcon,
    PersonIcon,
    TokenIcon,
    WrenchIcon,
    XMarkIcon
} from '@navikt/aksel-icons';
import {Link, useLoaderData} from "@remix-run/react";

export function LayoutAppbar() {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { displayName } = useLoaderData();

    return (

        <>
                {/*<header className="grid h-20">*/}
                    <HStack as="nav" justify="space-between" align="center">
                        <a href="/" className="px-2 py-5">
                            <img src={"/img/Novari-big-gray.png"} height={"50px"} alt={"Novari Logo"}/>
                        </a>
                        <div className="grid h-full">
                            <HStack align="center">
                                <Button
                                    ref={buttonRef}
                                    icon={menuOpen ? <XMarkIcon aria-hidden /> : <MenuHamburgerIcon aria-hidden />}
                                    variant="tertiary"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    Meny
                                </Button>
                                {/*<Hide below="sm" asChild>*/}
                                {/*    <Button icon={<BellIcon aria-hidden />} variant="tertiary">*/}
                                {/*        Varsler*/}
                                {/*    </Button>*/}
                                {/*</Hide>*/}
                                <Hide below="md" asChild>
                                    <Link to="/profile">
                                        <Button as="div" icon={<PersonIcon aria-hidden />} variant="tertiary">
                                            <BodyShort weight="semibold" truncate className="max-w-[10vw]">
                                                {displayName.fullName}
                                            </BodyShort>
                                        </Button>
                                    </Link>
                                </Hide>
                                <Hide below="md" asChild>
                                    <Button icon={<LeaveIcon aria-hidden />} variant="tertiary">
                                        Logg ut
                                    </Button>
                                </Hide>
                            </HStack>
                        </div>
                    </HStack>
                {/*</header>*/}

            <Popover
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchorEl={buttonRef.current}
                offset={0}
                arrow={false}
                placement="bottom"
            >
                <Popover.Content>
                    <Heading size={'small'}>A way cool menu :)</Heading>
                    <Link to={"/"} onClick={() => setMenuOpen(false)}>To the dashboard</Link>
                    <HGrid gap="6" columns={2}>

                        <Box>
                            <LinkPanel border={false} href="/contact">
                                <LinkPanel.Title><PersonGroupIcon title="a11y-title" fontSize="1.5rem" /> Contacts</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href="/organization">
                                <LinkPanel.Title><Buldings3Icon title="a11y-title" fontSize="1.5rem" /> Organizations</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href="/component">
                                <LinkPanel.Title><ComponentIcon title="a11y-title" fontSize="1.5rem" /> Components</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href="/access">
                                <LinkPanel.Title><PackageIcon title="a11y-title" fontSize="1.5rem" /> Packages</LinkPanel.Title>
                            </LinkPanel>
                        </Box>

                        <Box>
                            <LinkPanel border={false} href="/tools">
                                <LinkPanel.Title><WrenchIcon title="a11y-title" fontSize="1.5rem" /> Tools</LinkPanel.Title>
                                <LinkPanel.Description>Data Consistency Reports</LinkPanel.Description>
                            </LinkPanel>
                            <LinkPanel border={false} href="/molly">
                                <LinkPanel.Title><TokenIcon title="a11y-title" fontSize="1.5rem" /> Molly</LinkPanel.Title>
                                <LinkPanel.Description>Create a deployment script.</LinkPanel.Description>
                            </LinkPanel>
                        </Box>

                    </HGrid>

                </Popover.Content>
            </Popover>
        </>


    );
}

