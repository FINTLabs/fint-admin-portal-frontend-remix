//_index.tsx
import React from "react";
import {Box, Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";


// export const loader = async () => {
//     try {
//         const componentsData = await ComponentApi.fetchComponents();
//         console.log(componentsData.length);
//         return json({ componentsData });
//     } catch (error) {
//         console.log("Error fetching components:", error);
//         throw new Error("Error fetching components");
//     }
// };

export default function TestPage() {
    const data = useLoaderData();

    return (

        <>
            <Box
                // background="surface-alt-4-moderate"
                padding="8"
                paddingBlock="16"
                as="main"
            >
                <Heading size={"small"}>Hello world</Heading>
                {data.componentsData.length}
            </Box>
        </>
    );
}
