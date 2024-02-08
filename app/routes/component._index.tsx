// component._index.tsx
import React, {useEffect, useRef, useState} from 'react';
import {Alert, InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import {useFetcher, useLoaderData} from "@remix-run/react";
import ComponentApi from "~/api/component-api";
import {json} from "@remix-run/node";
import ComponentForm from "~/components/component-form";
import {defaultComponent} from "~/api/types";

export const loader = async () => {

    try {
        const componentsData = await ComponentApi.fetch();
        return json({ componentsData });
    } catch (error) {
        throw new Error("Error fetching components");
    }

};

export async function action({ request }) {

    const formData = await request.formData();
    const formValues = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    console.log("formValues", formValues);

    try {
        const response = await ComponentApi.create(formValues);
        return json({ show: true, message: response.message, variant: response.variant });
    } catch (error) {
        return json({ show: true, message: error.message, variant: 'error' });
    }

}

export default function ComponentPage ()  {

    const componentEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const loaderData = useLoaderData();
    const componentsData = loaderData ? loaderData.componentsData : [];
    const [show, setShow] = React.useState(false);

    const fetcher = useFetcher();

    useEffect(() => {
        setShow(true);
    }, [fetcher.state]);

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

            <Modal ref={componentEditRef} header={{ heading: "Add New Component" }} width={400}>
                <Modal.Body>
                    <ComponentForm
                        selectedComponent={defaultComponent}
                        f={fetcher}
                        r={componentEditRef}
                    />
                </Modal.Body>
            </Modal>

            {fetcher.data && show && (
                <Alert variant={fetcher.data.variant} closeButton onClose={() => setShow(false)}>
                    {(fetcher.data && fetcher.data.message) || "Content"}
                </Alert>
            )}

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