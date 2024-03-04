//access.tsx
import React from "react";
import {Alert, Box, Page} from "@navikt/ds-react";
import LayoutHeader from "~/components/layout-header";
import {TasklistIcon} from "@navikt/aksel-icons";
import {Outlet} from "@remix-run/react";
import Breadcrumbs from "~/components/breadcrumbs";
export default function Index() {

    const breadcrumbs = [
        { name: 'Templates', link: '/access' },
    ];

    return (

        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <LayoutHeader title={"Tilgangspakker (maler)"} icon={TasklistIcon} />
            <Box
                padding="8"
                paddingBlock="16"
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
