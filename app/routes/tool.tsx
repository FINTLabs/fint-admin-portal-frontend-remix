import type { MetaFunction, LinksFunction } from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {Box, Chips, Heading, List, VStack, Button, HGrid} from "@navikt/ds-react";
import React, {useMemo, useState} from "react";
import organisationsTools from '~/data/organization-tools';
import technicalTools from "~/data/technical-tools";
import {CheckmarkCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles }
];

const StatusList = ({ data }) => {

    const [selected, setSelected] = useState(['missing']);

    const filteredData = useMemo(() => {
        if (selected.length === 0) return data;

        return Object.fromEntries(
            Object.entries(data).map(([key, items]) => {
                const filteredItems = items.filter((item) => {
                    const [status, organization] = item.split(": ");
                    return (
                        selected.includes(status.toLowerCase()) ||
                        selected.includes(organization.toLowerCase())
                    );
                });

                return [key, filteredItems];
            })
        );
    }, [data, selected]);


    return (

        <VStack gap="4">
            <HGrid gap="6" columns={5}>
                <Button size="small" variant="primary" >
                    Organizations
                </Button>
                <Button size="small" variant="primary" >
                    Adapter
                </Button>
                <Button size="small" variant="primary" >
                    Klient
                </Button>
                <Button size="small" variant="primary" >
                    Juridisk kontakt
                </Button>
                <Button size="small" variant="primary" >
                    Technical kontakt
                </Button>
            </HGrid>

                    <Box padding="4" background="surface-alt-3-subtle">
                        <Chips>
                            <Chips.Toggle
                                selected={selected.includes('ok')}
                                key={'ok'}
                                onClick={() =>
                                    setSelected(
                                        selected.includes('ok')
                                            ? selected.filter((x) => x !== 'ok')
                                            : [...selected, 'ok']
                                    )
                                }
                            >Ok</Chips.Toggle>
                            <Chips.Toggle
                                selected={selected.includes('missing')}
                                key={'missing'}
                                onClick={() =>
                                    setSelected(
                                        selected.includes('missing')
                                            ? selected.filter((x) => x !== 'missing')
                                            : [...selected, 'missing']
                                    )
                                }
                            >Missing</Chips.Toggle>
                        </Chips>
                    </Box>


                <Box padding="4" background="surface-success-subtle">
                    {Object.entries(filteredData).map(([component, items]) => (
                        <div key={component}>
                            <List as="ul" title={component}>
                                {items

                                    .map((item, index) => {
                                        const [status, organization] = item.split(': ');

                                        let icon;
                                        let title;
                                        let description;

                                        if (status === 'OK') {
                                            icon = <CheckmarkCircleIcon aria-hidden />;
                                            title = 'OK';
                                            description = `OK: ${organization}`;
                                        } else {
                                            icon = <XMarkOctagonIcon aria-hidden />;
                                            title = 'Missing';
                                            description = `Missing: ${organization}`;
                                        }

                                        return (
                                            <List.Item key={index} title={title} icon={icon}>
                                                {description}
                                            </List.Item>
                                        );
                                    })}
                            </List>
                        </div>
                    ))}
                </Box>






        </VStack>

    );
};


export default function OrganizationToolPage() {




    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Heading size={"small"}>Organization Testing Tool</Heading>
            <div>
                <h2>Status of Components</h2>
                <StatusList data={technicalTools} />
            </div>
        </div>
    );
}
