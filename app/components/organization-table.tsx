import React, {useState} from 'react';
import {Table} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {ChevronDownDoubleIcon, InformationSquareIcon} from "@navikt/aksel-icons";
import type {IOrganization} from "~/api/types";

interface OrganizationTableProps {
    data: IOrganization[];
}

const OrganizationTable = ({ data } : OrganizationTableProps) => {

    const [sortColumn, setSortColumn] = useState<'displayName' | 'primaryAssetId'>('displayName');

    const sortData = (data: IOrganization[]) => {
        return [...data].sort((a, b) => {
            if (sortColumn === 'displayName') {
                return a.displayName.localeCompare(b.displayName);
            } else if (sortColumn === 'primaryAssetId') {
                // Assuming primaryAssetId is always a string. Adjust comparison logic if it's not.
                return (a.primaryAssetId ?? '').localeCompare(b.primaryAssetId ?? '');
            }
            return 0;
        });
    };

    const sortedData = sortData(data);

    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">
                        <div style={{ cursor: 'pointer' }} onClick={() => setSortColumn('displayName')}>
                            Navn {sortColumn === 'displayName' && <ChevronDownDoubleIcon title="Sort by name" />}
                        </div>
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" style={{ cursor: 'pointer' }} onClick={() => setSortColumn('primaryAssetId')}>
                        Asset Id {sortColumn === 'primaryAssetId' && <ChevronDownDoubleIcon title="Sort by asset id" />}
                    </Table.HeaderCell>
                    <Table.HeaderCell scope="col" style={{ fontWeight: 'bold' }}>View</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortedData.map((row, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>{row.displayName}</Table.DataCell>
                        <Table.DataCell>{row.primaryAssetId}</Table.DataCell>
                        <Table.DataCell>
                            <Link to={`/organization/${row.orgNumber}`}>
                                <InformationSquareIcon title="a11y-title" fontSize="1.5rem" />
                            </Link>

                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default OrganizationTable;