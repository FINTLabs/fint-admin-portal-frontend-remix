import {
    BodyShort,
    Box,
    Detail,
    HStack,
    Heading,
    Hide,
    Show,
    VStack,
} from "@navikt/ds-react";
import { ComponentIcon, Buldings3Icon } from '@navikt/aksel-icons';


const LayoutHeader = ({ icon: IconComponent, title, breadcrumbs }) => {
    return (

        <Box
            as="header"
            borderWidth="0 0 4 0"
            borderColor="border-success"
            // paddingBlock="0 0"
        >
            <div className="max-w-5xl">
                <Box background="surface-default" paddingInline="4" paddingBlock="0 6">
                    <VStack gap={"3"}>
                        <HStack gap={"5"}>
                            {breadcrumbs?.map((detail, index) => (
                                <Detail key={index}>{detail}</Detail>
                            ))}
                        </HStack>

                        <HStack align="start" gap="8">
                            <Hide below="md">
                                {IconComponent && <IconComponent title="a11y-title" fontSize="3.5rem" />}
                            </Hide>
                            <Heading level="1" size="xlarge">
                                {title}
                            </Heading>

                        </HStack>
                    </VStack>
                </Box>
            </div>
        </Box>

        // <Box
        //     as="header"
        //     borderWidth="0 0 4 0"
        //     borderColor="border-success"
        //     paddingBlock="12 0"
        // >
        //     <div className="max-w-5xl">
        //         <Box background="surface-default" paddingInline="4" paddingBlock="0 6">
        //             <HStack align="start" gap="8">
        //                 <Hide below="md">
        //                     {IconComponent && <IconComponent title="a11y-title" fontSize="3.5rem" />}
        //                 </Hide>
        //
        //                 {/*<VStack gap={{ xs: "4", md: "5" }}>*/}
        //                     <Heading level="1" size="xlarge">
        //                         {title}
        //                     </Heading>
        //
        //                     {/*<Hide below="md">*/}
        //                     {/*    <HStack gap="4" align="center">*/}
        //                     {/*        <BodyShort size="small">{body}</BodyShort>*/}
        //                     {/*        <span aria-hidden="true">|</span>*/}
        //                     {/*        <Detail>{details}</Detail>*/}
        //                     {/*    </HStack>*/}
        //                     {/*</Hide>*/}
        //                     {/*<Show below="md">*/}
        //                     {/*    <VStack gap="2">*/}
        //                     {/*        <BodyShort size="small">{body}</BodyShort>*/}
        //                     {/*        <Detail>{details}</Detail>*/}
        //                     {/*    </VStack>*/}
        //                     {/*</Show>*/}
        //                 {/*</VStack>*/}
        //             </HStack>
        //         </Box>
        //     </div>
        // </Box>
    );
};

export default LayoutHeader;
