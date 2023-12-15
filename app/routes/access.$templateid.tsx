import React from "react";
import {Heading, Table} from "@navikt/ds-react";
import templateApi from "~/api/template-api";
import {useLoaderData} from "@remix-run/react";

export async function loader({ params }: { params: { templateid: string } }) {
    const templateName = params.templateid;

    const selectedTemplate = await templateApi.fetchTemplateByName(templateName);

    const checkPermission = (collectionPath, permissionList) => {
        return permissionList.includes(collectionPath);
    };

    const dataWithPermissions = selectedTemplate.collection.map(collection => {
        return {
            collectionPath: collection,
            hasReadPermission: checkPermission(collection, selectedTemplate.read),
            hasWritePermission: checkPermission(collection, selectedTemplate.modify),
        };
    });

    return { selectedTemplate, dataWithPermissions };
}

const AccessTemplatePage = () => {
    const { selectedTemplate, dataWithPermissions } = useLoaderData<typeof loader>();

    return (
        <>
            <Heading level="1" size="large">
                {selectedTemplate?.name}
            </Heading>
            <Heading level="1" size="small">
                {selectedTemplate?.description}
            </Heading>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Components</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Read</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Modify</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataWithPermissions.map((item, i) => (
                        <Table.Row key={i}>
                            <Table.DataCell>{item.collectionPath}</Table.DataCell>
                            <Table.DataCell>{item.hasReadPermission ? "Read Checkmark" : ""}</Table.DataCell>
                            <Table.DataCell>{item.hasWritePermission ? "Write Checkmark" : ""}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};

export default AccessTemplatePage;
