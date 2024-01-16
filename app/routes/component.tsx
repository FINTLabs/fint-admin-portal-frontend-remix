import React from "react";
import {Box, Page} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import LayoutHeader from "~/components/layout-header";
import {ComponentIcon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import Breadcrumbs from "~/components/breadcrumbs";
import type { LinksFunction, MetaFunction} from "@remix-run/node";

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
    return (

        <>

            <Breadcrumbs/>
            <LayoutHeader title={"Components"} icon={ComponentIcon}/>

            <Box
                // background="surface-alt-4-moderate"
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
