import React from "react";
import {Box, Heading, Page, TextField} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import LayoutHeader from "~/components/layout-header";
import {ComponentIcon} from "@navikt/aksel-icons";
import {useFetcher, useActionData} from "@remix-run/react";
import Breadcrumbs from "~/components/breadcrumbs";
import type {ActionFunctionArgs, LinksFunction, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import { useRef } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import {TestForm} from "~/routes/test/TestForm";
import ComponentForm from "~/components/component-form";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

// export const loader = async () => {
//     try {
//         const componentsData = await ComponentApi.fetchComponents();
//         return json({ componentsData });
//     } catch (error) {
//         console.log("Error fetching components:", error);
//         throw new Error("Error fetching components");
//     }
// };

export async function action({ request }) {
    // process the request
    return json({ message: "Form submitted successfully!" });
}


// export async function action({
//                                  request,
//                              }: ActionFunctionArgs) {
//     const body = await request.formData();
//     const name = body.get("visitorsName");
//     return json({ message: `Hello, ${name}` });
// }


export default function Component() {
    const data = useActionData<typeof action>();
    const fetcher = useFetcher();
    const ref = useRef<HTMLDialogElement>(null);


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

                    <div className="py-16">
                        <Heading size={"xsmall"} >Hello from route</Heading>
                    </div>
                </Page.Block>
            </Box>
        </>
    );
}
