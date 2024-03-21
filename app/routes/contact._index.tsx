import React, {useEffect, useRef, useState} from "react";
import {Alert, InternalHeader, Modal, Search, Spacer,} from "@navikt/ds-react";
import ContactTable from "~/components/contacts-table";
import {PersonPlusIcon} from '@navikt/aksel-icons';
import {defaultContact, IContact, IFetcherResponseData} from '~/api/types'
import ContactApi from "~/api/contact-api";
import type {ActionFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useFetcher, useLoaderData} from "@remix-run/react";
import OrganizationApi from "~/api/organization-api";
import ContactForm from "~/components/contact-form";

export const loader = async ({request}: {request: Request}) => {
    const cookies = request.headers.get('cookie');
    if (cookies === null) {
        throw new Error("No cookies found in the request headers");
    }
    try {
        const [contactsData, organizationsData] = await Promise.all([
            ContactApi.fetch(cookies),
            OrganizationApi.fetch()
        ]);
        return json({contactsData, organizationsData});
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Response("Not Found", {status: 404});
    }
};


export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const actionType = formData.get("actionType");

    let formValues: any = {};
    for (const [key, value] of formData) {
        formValues[key] = value;
    }

    let response;
    switch (actionType) {
        case "create":
            response = await ContactApi.create(formValues);
            break;
        case "update":
            response = await ContactApi.update(formValues, formValues.nin);
            break;
        case "delete":
            response = await ContactApi.delete(formValues, formValues.nin);
            break;
        default:
            return json({show: true, message: "Unknown action type", variant: "error"});
    }

    return json({show: true, message: response?.message, variant: response?.variant});
}

const initialContactArray: IContact[] = [];

export default function ContactPage() {
    const [filteredData, setFilteredData] = useState<IContact[]>(initialContactArray);
    const contactEditRef = useRef<HTMLDialogElement>(null!);
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();
    const actionData = fetcher.data as IFetcherResponseData;
    const loaderData = useLoaderData<typeof loader>();
    const organizationsData = loaderData.organizationsData;
    const contactsData = loaderData.contactsData;

    useEffect(() => {
        if (actionData && actionData.show) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [fetcher.data]);

const handleSearchInputChange = (input: any) => {
    setSearch(input);
    if (contactsData !== null) {
        const filtered = contactsData.filter(
            (row: { firstName: string; lastName: string; }) =>
                row.firstName.toLowerCase().includes(input.toLowerCase()) ||
                row.lastName.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    }
};

    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <Modal ref={contactEditRef} header={{heading: "Legg til ny kontakt"}} width={400}>
                <Modal.Body>
                    <ContactForm selectedContact={defaultContact} f={fetcher} r={contactEditRef}/>
                </Modal.Body>
            </Modal>

            {actionData && show && (
                <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton
                       onClose={() => setShow(false)}>
                    {actionData.message || "Content"}
                </Alert>
            )}

            <InternalHeader>
                <InternalHeader.Button onClick={() => contactEditRef.current?.showModal()}>
                    <PersonPlusIcon title="a11y-title" fontSize="1.5rem"/>Legg til ny
                </InternalHeader.Button>

                <Spacer/>

                <form
                    className="self-center px-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Search
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                        onChange={handleSearchInputChange}
                    />
                </form>

            </InternalHeader>

            <ContactTable
                data={search !== "" ? filteredData : contactsData}
                organizations={organizationsData}
                f={fetcher}
            />

        </div>
    );
}

export function ErrorBoundary({error}: { error: Error }) {
    return (
        <>
            <p>Something went wrong fetching contacts.</p>
            <p>{error?.message}</p>
        </>
    );
}