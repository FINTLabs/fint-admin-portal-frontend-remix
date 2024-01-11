import React, {useEffect, useRef, useState} from 'react';
import {InternalHeader, Search, Spacer} from "@navikt/ds-react";
import {ComponentIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import ComponentAdd from "~/components/component-form-modal";
import type {IComponent} from "~/api/types";
import ComponentApi from "~/api/component-api";

const ComponentPage = () => {
    const componentEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IComponent[]>([])
    const [components, setComponents] = useState<IComponent[]>([]);

    //TODO: write a context for each main menu item??
    useEffect(() => {
        ComponentApi.fetchComponents()
            .then((componentsData) => {
                if (componentsData) {
                    setComponents(componentsData);
                    setFilteredData(componentsData);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching components:", error);
            });
    }, []);


    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact add form inside index");
        componentEditRef?.current?.close();
    };

    const handleSearchInput = (input:any) => {
        const filtered = components.filter(
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

            <ComponentsTable data={filteredData} />
        </div>
    );
};

export default ComponentPage;
