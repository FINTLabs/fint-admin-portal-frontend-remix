import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {InternalHeader, Table, Spacer, Search, HStack, LinkPanel, Box} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import organisations from '~/data/organisation';
import OrganizationTable from "~/components/organization-table";
import {Buldings3Icon, PersonGroupIcon, PersonPlusIcon} from "@navikt/aksel-icons";
import React, {useRef} from "react";
import CustomFormModal from "~/components/contact-add";

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
                    selectedContact={null}
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
                        />
                    </form>


                </InternalHeader>

                <OrganizationTable data={organisations}/>

            </div>
        );
    }
