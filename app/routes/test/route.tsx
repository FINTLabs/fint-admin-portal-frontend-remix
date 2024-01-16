import React from "react";
import {Box, Page} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import LayoutHeader from "~/components/layout-header";
import {ComponentIcon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import Breadcrumbs from "~/components/breadcrumbs";
import type { LinksFunction, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import ComponentApi from "~/api/component-api";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

export const loader = async () => {
    try {
        const componentsData = await ComponentApi.fetchComponents();
        return json({ componentsData });
    } catch (error) {
        console.log("Error fetching components:", error);
        throw new Error("Error fetching components");
    }
};

export default function Component() {

    return (

        <>

            <Breadcrumbs/>
            <LayoutHeader title={"Testing index"} icon={ComponentIcon}/>

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
