// component._index.tsx
import React, {useEffect, useRef, useState} from 'react';
import {Alert, InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import {useActionData, useFetcher, useLoaderData} from "@remix-run/react";
import ComponentApi from "~/api/component-api";
import {type ActionFunctionArgs, json} from "@remix-run/node";
import ComponentForm from "~/components/component-form";
import {defaultComponent, IComponent} from "~/api/types";

function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === "object" && error !== null && "message" in error;
}

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

    try {
        const response = await ComponentApi.create(formValues);
        return json({ show: true, message: response.message, variant: response.variant });
    } catch (error) {
        // Handle any errors here
        if (isErrorWithMessage(error)) {
            // Now TypeScript knows error has a message property
            return json({ show: true, message: error.message, variant: "error" });
        } else {
            // Handle the case where the error does not have a message property
            return json({ show: true, message: "An unknown error occurred", variant: "error" });
        }
    }

}

interface LoaderData {
    componentsData: IComponent[];
}

const initialComponentArray: IComponent[] = [];

export default function ComponentPage ()  {

    const componentEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IComponent[]>(initialComponentArray);
    const [search, setSearch] = useState("");
    const [show, setShow] = React.useState(false);
    const loaderData = useLoaderData<LoaderData>();
    const componentsData = loaderData.componentsData;
    const fetcher = useFetcher();
    const actionData = useActionData<typeof action>();

    useEffect(() => {
        setShow(true);
    }, [fetcher.state]);

    const handleSearchInput = (input: string) => {
        setSearch(input);
        const filtered = componentsData.filter(
            (component) =>
                component.name.toLowerCase().includes(input.toLowerCase()) ||
                component.description.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

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

            {actionData && show && (
                <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton onClose={() => setShow(false)}>
                    {actionData.message || "Content"}
                </Alert>
            )}

            <InternalHeader>

                <InternalHeader.Button onClick={() => componentEditRef.current?.showModal()}>
                    <ComponentIcon title="a11y-title" fontSize="1.5rem"/>Add New
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
                        onChange={(value) => handleSearchInput(value)} // Adjusted to pass only the value
                    />
                </form>

            </InternalHeader>

            <ComponentsTable data={search != "" ? filteredData : componentsData}/>
        </div>
    );
}