import {Box, Page} from "@navikt/ds-react";
import LayoutHeader from "~/components/layout-header";
import {PersonGroupIcon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import React from "react";
import Breadcrumbs from "~/components/breadcrumbs";

export default function Index() {
    const breadcrumbs = [
        { name: 'Kontakter', link: '/contact' },
    ];

    return (

<>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <LayoutHeader title={"Kontakter"} icon={PersonGroupIcon}/>
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
