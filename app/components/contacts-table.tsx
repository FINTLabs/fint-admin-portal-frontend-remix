import React, { useRef, useState } from 'react';
import { Button, Modal, Table } from "@navikt/ds-react";
import { Link } from "@remix-run/react";
import {PersonGavelIcon, PencilIcon} from '@navikt/aksel-icons';
import ContactForm from "~/components/contact-form";
import type { IContact } from '~/api/types';
import { defaultContact } from "~/api/types";

interface ContactTableProps {
    data: IContact[];
    organizations: any[];
    f: any;
    editable?: boolean;
    legalContactDn?: string | null;
}

const ContactTable = ({ data, organizations, f, editable = true, legalContactDn }: ContactTableProps) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

    const openEditModal = (contact: IContact) => {
        if (!editable) return;
        setSelectedContact(contact);
        modalRef.current?.showModal();
    };

    const getTechnicalContact = (technicalDN: string) => {
        const technicalContact = organizations.find((org) => org.dn === technicalDN);
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
                        {legalContactDn && <Table.HeaderCell />}

                        <Table.HeaderCell />
                        <Table.HeaderCell style={{ fontWeight: 'bold' }}>Name</Table.HeaderCell>
                        <Table.HeaderCell style={{ fontWeight: 'bold' }}>Technical</Table.HeaderCell>
                        {editable && <Table.HeaderCell />}
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
                            {legalContactDn && (
                                <Table.DataCell>
                                    {row.dn === legalContactDn && (
                                        <PersonGavelIcon title="Legal Contact" fontSize="1.5rem" />
                                    )}
                                </Table.DataCell>
                            )}
                            <Table.DataCell>
                                <div>{row.firstName} {row.lastName}</div>
                                <div>{row.mail}</div>
                                <div>{row.mobile}</div>
                            </Table.DataCell>
                            <Table.DataCell>
                                {row.technical?.map((technicalDN) => (
                                    getTechnicalContact(technicalDN)
                                ))}
                            </Table.DataCell>
                            {editable && (
                                <Table.DataCell>
                                    <Button
                                        onClick={() => openEditModal(row)}
                                        icon={<PencilIcon title="Rediger" />}
                                        size="xsmall"
                                    />
                                </Table.DataCell>
                            )}
                        </Table.ExpandableRow>
                    ))}
                </Table.Body>
            </Table>

            {editable && (
                <Modal ref={modalRef} header={{ heading: "Edit Contact" }} width={400}>
                    <Modal.Body>
                        <ContactForm
                            selectedContact={selectedContact || defaultContact}
                            f={f}
                            r={modalRef}
                        />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default ContactTable;
