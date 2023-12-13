import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {InternalHeader, Table, Spacer, Search, HStack, LinkPanel, Box} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import organisations from '~/api/organisation';
import OrganizationTable from "~/components/organization-table";
import {Buldings3Icon, PersonGroupIcon, PersonPlusIcon} from "@navikt/aksel-icons";
import React, {useEffect, useRef, useState} from "react";
import CustomFormModal from "~/components/organization-add";
import {any} from "prop-types";
import {IOrganization} from "~/api/types";
import contacts from "~/api/contacts";
import organisation from "~/api/organisation";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Portal Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: navStyles }
]

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null);
    const [searchInput, setSearchInput] = useState("");
    const [filteredData, setFilteredData] = useState<IOrganization[]>([])

    useEffect(() => {
        setFilteredData(organisation);
    }, []);

    const handleSearchInput = (input:any) => {
        setSearchInput(input);
        const filtered = organisations.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.displayName.toLowerCase().includes(input.toLowerCase()) ||
                row.orgNumber.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered)
    };

    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the organization add form inside index");
        organizationEditRef.current?.close();
    }

        return (
            <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
                <CustomFormModal
                    ref={organizationEditRef}
                    headerText="Add New organization Form"
                    onClose={handleFormClose}
                    selectedOrganization={null}
                />


                <InternalHeader>
                    <InternalHeader.Button onClick={() => organizationEditRef.current?.showModal()}>
                        <PersonPlusIcon title="a11y-title" fontSize="1.5rem"/>Add New
                    </InternalHeader.Button>
                    <Spacer/>

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

                <OrganizationTable data={filteredData}/>

            </div>
        );
    }
