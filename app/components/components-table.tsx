import React from 'react';
import {Table, Tag} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {IComponent} from '../data/types';

interface ComponentsTableProps {
    data: IComponent[];
}

const ComponentsTable = ({ data }: ComponentsTableProps) => {
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>Name</Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>Miljøer</Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>Type</Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, index) => (
                    <Table.Row key={index} style={{ borderBottom: '1px dashed #e0e0e0' }} >
                        <Table.DataCell>
                            <div >{row.description}</div>
                            <div >{row.basePath}</div>
                        </Table.DataCell>
                        <Table.DataCell>
                            {row.inPlayWithFint && (
                                <Tag size="small" variant="alt1">
                                    PWF
                                </Tag>
                            )}

                            {row.inBeta && (
                                <Tag size="small" variant="alt1">
                                    Beta
                                </Tag>
                            )}

                            {row.inProduction && (
                                <Tag size="small" variant="alt1">
                                    API
                                </Tag>
                            )}
                        </Table.DataCell>
                        <Table.DataCell>
                            {row.openData && (
                                <Tag size="small" variant="alt3">
                                    Open
                                </Tag>
                            )}
                            {row.common && (
                                <Tag size="small" variant="alt3">
                                    Common
                                </Tag>
                            )}
                            {row.core && (
                                <Tag size="small" variant="alt3">
                                    Core
                                </Tag>
                            )}

                        </Table.DataCell>

                        <Table.DataCell>
                            <Link to={`/component/${row.name}`}>
                                <InformationSquareIcon title="a11y-title" fontSize="1.5rem" />
                            </Link>
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default ComponentsTable;