import React, { useRef, useState} from 'react';
import {InternalHeader, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import ComponentAdd from "~/components/component-form-modal";
import {useLoaderData} from "@remix-run/react";
import ComponentApi from "~/api/component-api";
import {json} from "@remix-run/node";


export const loader = async () => {
    try {
        const componentsData = await ComponentApi.fetchComponents();
        console.log(componentsData.length);
        return json({ componentsData });
    } catch (error) {
        console.log("Error fetching components:", error);
        throw new Error("Error fetching components");
    }
};

export default function ComponentPage ()  {

    const componentEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const loaderData = useLoaderData();
    const componentsData = loaderData ? loaderData.componentsData : [];

    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact add form inside index");
        componentEditRef?.current?.close();
    };

    const handleSearchInput = (input:any) => {
        setSearch(input);
        const filtered = componentsData.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.description.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered)
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <ComponentAdd
                ref={componentEditRef}
                headerText="Add New Component Form"
                onClose={handleFormClose}
            />

            <InternalHeader>

                <InternalHeader.Button onClick={() => componentEditRef.current?.showModal()}>
                    <ComponentIcon title="a11y-title" fontSize="1.5rem"/>Add New
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

            <ComponentsTable data={search!= ""? filteredData:componentsData} />
        </div>
    );
}