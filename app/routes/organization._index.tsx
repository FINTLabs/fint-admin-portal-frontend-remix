import React, {useRef, useState} from "react";
import {InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import OrganizationApi from "~/api/organization-api";
import OrganizationTable from "~/components/organization-table";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import OrganizationForm from "~/components/organization-form";
import type {IOrganization} from "~/api/types";
import type {LoaderFunction} from "@remix-run/router";
import {json} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";

export const loader: LoaderFunction = async () => {
    try {
        const organizationsData = await OrganizationApi.fetchOrganizations();
        return json({ organizationsData });
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Response("Not Found", { status: 404 });
    }
};

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IOrganization[]>([]);
    const [search, setSearch] = useState<string>("");
    const loaderData = useLoaderData();
    const organizations = loaderData ? loaderData.organizationsData : [];
    const fetcher = useFetcher();

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

    const handleFormClose = () => {
        // todo: Handle form submission logic
        console.log("closing the organization add form inside index");
        organizationEditRef.current?.close();
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Modal ref={organizationEditRef} header={{ heading: "Add New Component" }} width={400}>
                <Modal.Body>
                    <OrganizationForm f={fetcher} r={organizationEditRef}/>
                </Modal.Body>
            </Modal>

            <OrganizationForm
                ref={organizationEditRef}
                headerText="Add New organization Form"
                onClose={handleFormClose}
                selectedOrganization={null}
            />

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
        <html>
        <head>
            <title>Oh no!</title>
        </head>
        <body>
        Something went wrong.
        {error?.message}
        </body>
        </html>
    );
}