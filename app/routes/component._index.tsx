// component._index.tsx
import React, {useEffect, useRef, useState} from 'react';
import {Alert, InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import {useFetcher, useLoaderData} from "@remix-run/react";
import ComponentApi from "~/api/component-api";
import {type ActionFunctionArgs, json} from "@remix-run/node";
import ComponentForm from "~/components/component-form";
import {defaultComponent, IComponent, IFetcherResponseData} from "~/api/types";

export const loader = async () => {

    try {
        const componentsData = await ComponentApi.fetch();
        return json({ componentsData });
    } catch (error) {
        throw new Error("Error fetching components");
    }

};

export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData();
    const formValues: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }
    console.log("formValues", formValues);

    const response = await ComponentApi.create(formValues);
    return json({ show: true, message: response.message, variant: response.variant });

}

const initialComponentArray: IComponent[] = [];

export default function ComponentPage ()  {

    const componentEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IComponent[]>(initialComponentArray);
    const [search, setSearch] = useState("");
    const [show, setShow] = React.useState(false);
    const loaderData = useLoaderData<typeof loader>();
    const componentsData = loaderData.componentsData;
    const fetcher = useFetcher();
    const actionData = fetcher.data as IFetcherResponseData;

    useEffect(() => {
        if (actionData && actionData.show) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [fetcher.data]);

    const handleSearchInput = (input: string) => {
        setSearch(input);
        const filtered = componentsData.filter(
            (component: { name: string; description: string; }) =>
                component.name.toLowerCase().includes(input.toLowerCase()) ||
                component.description.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Modal ref={componentEditRef} header={{ heading: "Legg til ny komponent" }} width={400}>
                <Modal.Body>
                    <ComponentForm
                        selectedComponent={defaultComponent}
                        f={fetcher}
                        r={componentEditRef}
                    />
                </Modal.Body>
            </Modal>

            {actionData && show && (
                <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton onClose={() => setShow(false)}>
                    {actionData.message || "Content"}
                </Alert>
            )}

            <InternalHeader>

                <InternalHeader.Button onClick={() => componentEditRef.current?.showModal()}>
                    <ComponentIcon title="a11y-title" fontSize="1.5rem"/>Legg til ny
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
                        id={"searchField"}
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                        onChange={(value) => handleSearchInput(value)} // Adjusted to pass only the value
                    />
                </form>

            </InternalHeader>

            <ComponentsTable data={search != "" ? filteredData : componentsData}/>
        </div>
    );
}