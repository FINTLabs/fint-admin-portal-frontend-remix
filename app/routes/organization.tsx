import React from "react";
import {Box, Page} from "@navikt/ds-react";
import LayoutHeader from "~/components/layout-header";
import {Buldings3Icon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import Breadcrumbs from "~/components/breadcrumbs";

export default function Index() {
    const breadcrumbs = [
        { name: 'Organisasjoner', link: '/organization' },
    ];

    return (

        <>

            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <LayoutHeader title={"Organisasjoner"} icon={Buldings3Icon}/>

            <Box
                // background="surface-alt-4-moderate"
                padding="8"
                paddingBlock="16"
            >
                <Page.Block gutters width="lg">
                    <Outlet />
                </Page.Block>
            </Box>
        </>
    );
}
