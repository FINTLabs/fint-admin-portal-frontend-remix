import React, {useEffect, useRef, useState} from "react";
import {Alert, InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import OrganizationApi from "~/api/organization-api";
import OrganizationTable from "~/components/organization-table";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import OrganizationForm from "~/components/organization-form";
import type {IOrganization} from "~/api/types";
import {json} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import {defaultOrganization} from "~/api/types";

export const loader = async () => {

    try {
        const data = await OrganizationApi.fetch();
        return json({ data });
    } catch (error) {
        throw new Error("Error fetching organizations");
    }

};

export async function action({ request }) {

    const formData = await request.formData();
    const formValues = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    console.log("formValues", formValues);

    // try {
        const response = await OrganizationApi.create(formValues);
        return json({ show: true, message: response.message, variant: response.variant });
    // } catch (error) {
    //     return json({ show: true, message: error.message, variant: 'error' });
    // }

}

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IOrganization[]>([]);
    const [search, setSearch] = useState<string>("");
    const loaderData = useLoaderData();
    const organizations = loaderData ? loaderData.data : [];
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();

    useEffect(() => {
        setShow(true);
    }, [fetcher.state]);

    const handleSearchInput = (input: any) => {
        setSearch(input);
        const filtered = organizations.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.displayName.toLowerCase().includes(input.toLowerCase()) ||
                row.orgNumber.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // const handleFormClose = () => {
    //     // todo: Handle form submission logic
    //     console.log("closing the organization add form inside index");
    //     organizationEditRef.current?.close();
    // };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Modal ref={organizationEditRef} header={{ heading: "Add New Organization" }} width={400}>
                <Modal.Body>
                    <OrganizationForm
                        selected={defaultOrganization}
                        f={fetcher}
                        r={organizationEditRef}
                    />
                </Modal.Body>
            </Modal>

            {fetcher.data && show && (
                <Alert variant={fetcher.data.variant} closeButton onClose={() => setShow(false)}>
                    {(fetcher.data && fetcher.data.message) || "Content"}
                </Alert>
            )}

            <InternalHeader>
                <InternalHeader.Button onClick={() => organizationEditRef.current?.showModal()}>
                    <PersonPlusIcon title="a11y-title" fontSize="1.5rem" />
                    Add New
                </InternalHeader.Button>
                <Spacer />

                <form
                    className="self-center px-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("Search!");
                    }}
                >
                    <Search
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                        onChange={handleSearchInput}
                    />
                </form>
            </InternalHeader>

            <OrganizationTable data={search!= ""? filteredData:organizations} />
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <>
            <p>Something went wrong.</p>
            <p>{error?.message}</p>
        </>
    );
}