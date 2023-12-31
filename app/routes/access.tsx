import React from "react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {Alert, Box, Page} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import LayoutHeader from "~/components/layout-header";
import {TasklistIcon} from "@navikt/aksel-icons";
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
    let breadcrumbs = ['Dashboard', 'Access Template'];

    return (

        <>

            <LayoutHeader title={"Tilgangspakker (maler)"} icon={TasklistIcon} breadcrumbs={breadcrumbs}/>

            <Box
                // background="surface-alt-4-moderate"
                padding="8"
                paddingBlock="16"
                as="main"
            >
                <Page.Block gutters width="lg">
                    <Box padding="4">
                        <Alert variant="info">
                            This area is not finished yet... so this list is only for show...
                        </Alert>
                    </Box>
                    <Outlet />
                </Page.Block>
            </Box>
        </>
    );
}
