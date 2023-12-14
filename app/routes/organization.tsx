import React from "react";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {Box, Page} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import LayoutHeader from "~/components/layout-header";
import {Buldings3Icon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";


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
    let breadcrumbs = ['Dashboard', 'Organizations'];

    return (

        <>

            <LayoutHeader title={"Organizations"} icon={Buldings3Icon} breadcrumbs={breadcrumbs}/>

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
