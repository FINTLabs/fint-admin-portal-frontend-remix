import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {Alert, Box, Detail, Heading, Hide, HStack, InternalHeader, LinkPanel, Page, VStack} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import {LayoutAppbar} from "~/components/layout-appbar";
import LayoutHeader from "~/components/layout-header";
import {ComponentIcon, PersonGroupIcon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import React from "react";
import Dashboard from "~/routes/dashboard";


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
    let breadcrumbs = ['Dashboard', 'Organizations', 'Contact'];

    return (

<>

    <LayoutHeader title={"Contacts"} icon={PersonGroupIcon} breadcrumbs={breadcrumbs}/>

            <Box
                background="surface-alt-4-moderate"
                padding="8"
                paddingBlock="16"
                as="main"
            >
                <Page.Block gutters width="lg">
                    <Outlet />
                </Page.Block>
            </Box>
</>
    );
}
