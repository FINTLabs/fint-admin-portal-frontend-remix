import React, {useState} from 'react';
import { useRef } from "react";
import organisations from '~/api/organisation';
import {Button, Table} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {DocPencilIcon, PencilIcon} from '@navikt/aksel-icons';
import CustomFormModal from "~/components/contact-add";
import { IContact } from '~/api/types';

interface ContactTableProps {
    data: IContact[];
}

const ContactTable = ({data} : ContactTableProps) => {

    const modalRef = useRef<HTMLDialogElement>(null);
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);


    const openEditModal = (contact: IContact) => {
        setSelectedContact(contact);
        modalRef.current?.showModal();
    };

    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact modal from the table");

        modalRef.current?.close();
    };


    const getTechnicalContact = (technicalDN: string) => {
        const technicalContact = organisations.find((org) => org.dn === technicalDN);

        if (technicalContact) {
            return (
                <Link to={`/organization/${technicalContact.orgNumber}`} key={technicalDN}>
                    <div>{technicalContact.displayName}</div>
                </Link>
            );
        }

        return null;
    };

    return (
        <>
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>Name</Table.HeaderCell>
                    {/*<Table.HeaderCell style={{ fontWeight: 'bold' }}>Mobile</Table.HeaderCell>*/}
                    <Table.HeaderCell style={{ fontWeight: 'bold' }}>Technical</Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row: IContact, index: number) => (
                    <Table.ExpandableRow
                        key={index}
                        style={{ borderBottom: '1px dashed #e0e0e0' }}
                        content={
                            <ul>
                                {row.roles?.map((role, roleIndex) => (
                                    <li key={roleIndex}>{role}</li>
                                ))}
                            </ul>
                        }
                    >
                        <Table.DataCell>
                            <div>{row.firstName} {row.lastName}</div>
                            <div>{row.mail}</div>
                            <div>{row.mobile}</div>
                        </Table.DataCell>
                        {/*<Table.DataCell nowrap="true" >{row.mobile} </Table.DataCell>*/}
                        <Table.DataCell>
                            {row.technical.map((technicalDN) => (
                                getTechnicalContact(technicalDN)
                            ))}

                        </Table.DataCell>
                        <Table.DataCell>
                            <Button
                                onClick={() => openEditModal(row)}
                                icon={<PencilIcon aria-hidden />}
                                size="xsmall"
                            />


                        </Table.DataCell>
                    </Table.ExpandableRow>
                ))}
            </Table.Body>
        </Table>
        <CustomFormModal
            ref={modalRef}
            headerText="Edit Contact Form"
            onClose={handleFormClose}
            selectedContact={selectedContact}
        />
        </>
    );
};

export default ContactTable;
