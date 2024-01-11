import React, {useRef, useState} from 'react';
import {Button, Table} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {InformationSquareIcon, PencilIcon} from "@navikt/aksel-icons";
import type {IOrganization} from "~/api/types";
import CustomFormModal from "~/components/organization-add";

interface OrganizationTableProps {
    data: IOrganization[];
}

const OrganizationTable = ({ data } : OrganizationTableProps) => {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<IOrganization | null>(null);

    const openEditModal = (organization: IOrganization) => {
        setSelectedOrganization(organization);
        modalRef.current?.showModal();
    };

    const handleFormClose = () => {
        //Handle form submisson logic
        console.log("closing the organization modal from the table");

        modalRef.current?.close();
    };


    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Asset Id</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Org Number</Table.HeaderCell>
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>View</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell scope="row">{row.displayName}</Table.DataCell>
                        <Table.DataCell>{row.primaryAssetId}</Table.DataCell>
                        <Table.DataCell>{row.orgNumber}</Table.DataCell>
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