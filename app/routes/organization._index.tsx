import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {InternalHeader, Table, Spacer, Search, HStack, LinkPanel, Box} from "@navikt/ds-react";
import navStyles from "@navikt/ds-css/dist/index.css";
import organisations from '~/data/organisation';
import OrganizationTable from "~/components/organization-table";
import {Buldings3Icon, PersonGroupIcon} from "@navikt/aksel-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Portal Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: navStyles }
];

export default function OrganizationPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>





        <InternalHeader>
            <InternalHeader.Title as="h1"><Buldings3Icon title="a11y-title" fontSize="1.5rem" /> Organizations</InternalHeader.Title>
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
                />
            </form>


        </InternalHeader>

    <OrganizationTable data={organisations} />

    </div>
  );
}
