import React, {useEffect, useRef, useState} from "react";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {InternalHeader, Search, Spacer} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import OrganizationApi from "~/api/organization-api";
import OrganizationTable from "~/components/organization-table";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import CustomFormModal from "~/components/organization-add";
import type {IOrganization} from "~/api/types";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles },
];

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IOrganization[]>([]);
    const [organizations, setOrganizations]  = useState<IOrganization[]>([]);

    useEffect(() => {
        OrganizationApi.fetchOrganizations()
            .then((organizationsData) => {
                if (organizationsData) {
                    setFilteredData(organizationsData);
                    setOrganizations(organizationsData);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching organizations:", error);
            });
    }, []);

    const handleSearchInput = (input: any) => {
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
            <CustomFormModal
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

            <OrganizationTable data={filteredData} />
        </div>
    );
}
