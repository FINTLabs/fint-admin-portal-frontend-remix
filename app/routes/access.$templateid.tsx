import { Table } from "@navikt/ds-react";
import { useLoaderData } from "@remix-run/react";
import template from '~/data/template';
import configurations from '~/data/configurations';

export function loader({ params }: { params: { templateid: string } }) {
    const templateid = params.templateid;

    const selectedComponent =
        template.find((t) => t.name === templateid) || null;

    return { selectedComponent };
}

const AccessTemplatePage = () => {
    const { selectedComponent } = useLoaderData<typeof loader>();

    const tableData = selectedComponent.collection.map((item: any, index: any) => ({
        key: index,
        name: item,
        read: selectedComponent.read.includes(item),
        modify: selectedComponent.modify.includes(item),
    }));

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Read</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Modify</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {configurations.map((item: any, i: any) => {
                    return (
                        <Table.Row
                            key={i}
                            content="Innhold i ekspanderbar rad"
                        >
                            <Table.DataCell scope="row">{item.name}</Table.DataCell>
                            <Table.DataCell scope="row">{item.path}</Table.DataCell>
                            <Table.DataCell scope="row">{item.classes.length}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default AccessTemplatePage;