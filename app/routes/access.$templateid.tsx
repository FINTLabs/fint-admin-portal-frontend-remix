import React from "react";
import {Heading, Table} from "@navikt/ds-react";
import templateApi from "~/api/template-api";
import {useLoaderData} from "@remix-run/react";
import {ITemplate} from "~/api/types";

interface DataWithPermissions {
    collectionPath: string;
    hasReadPermission: boolean;
    hasWritePermission: boolean;
}

export async function loader({ params }: { params: { templateid: string } }): Promise<{ selectedTemplate: ITemplate; dataWithPermissions: DataWithPermissions[] }> {
    const templateName = params.templateid;
    const selectedTemplate: ITemplate = await templateApi.fetchTemplateByName(templateName);

    const checkPermission = (collectionPath: string, permissionList: string[]): boolean => {
        return permissionList.includes(collectionPath);
    };

    const dataWithPermissions: DataWithPermissions[] = selectedTemplate.collection.map(collection => {
        return {
            collectionPath: collection,
            hasReadPermission: checkPermission(collection, selectedTemplate.read),
            hasWritePermission: checkPermission(collection, selectedTemplate.modify),
        };
    });

    return { selectedTemplate, dataWithPermissions };
}

const AccessTemplatePage = () => {
    const { selectedTemplate, dataWithPermissions } = useLoaderData<{ selectedTemplate: ITemplate; dataWithPermissions: DataWithPermissions[] }>();

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
