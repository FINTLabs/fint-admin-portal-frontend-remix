import React, { useRef, useState} from 'react';
import {Button, Modal, Table} from "@navikt/ds-react";
import {Link, useFetcher} from "@remix-run/react";
import {PencilIcon} from '@navikt/aksel-icons';
import ContactForm from "~/components/contact-form";
import type {IContact} from '~/api/types';
import {defaultContact} from "~/api/types";
import ContactApi from "~/api/contact-api";
import {json} from "@remix-run/node";


interface ContactTableProps {
    data: IContact[];
    organizations: any[];
    f: any;
}


const ContactTable = ({ data, organizations, f }: ContactTableProps) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
    //const fetcher = useFetcher();


    const openEditModal = (contact: IContact) => {
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
                            {row.technical?.map((technicalDN) => (
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

            <Modal ref={modalRef} header={{ heading: "Edit Contact" }} width={400}>
                <Modal.Body>
                    <ContactForm
                        selectedContact={selectedContact || defaultContact}
                        f={f}
                        r={modalRef}
                    />
                </Modal.Body>
            </Modal>


        </>
    );
};

export default ContactTable;
