import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { InternalHeader, Spacer, Search } from "@navikt/ds-react";
import {ComponentIcon, PersonPlusIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import components from "~/data/components";
import CustomFormModal from "~/components/contact-add";
import ComponentAdd from "~/components/component-add";
import {IComponent} from "~/data/types";

// Styled InternalHeader
const StyledInternalHeader = styled(InternalHeader)`
  --ac-internalheader-bg: var(--a-surface-inverted);
  --ac-internalheader-divider: var(--a-gray-600);
  --ac-internalheader-text: var(--a-text-on-inverted);
  --ac-internalheader-hover-bg: var(--a-surface-inverted-hover);
  --ac-internalheader-active-bg: var(--a-surface-inverted-active);

`;

const ComponentPage = () => {
    const componentEditRef = useRef<HTMLDialogElement>(null);
    const [searchInput, setSearchInput] = useState("");
    const [filteredData, setFilteredData] = useState<IComponent[]>([])

    useEffect(() => {
        setFilteredData(components)
    }, []);


    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact add form inside index");
        componentEditRef?.current?.close();
    };

    const handleSearchInput = (input:any) => {
        setSearchInput(input);
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

            <StyledInternalHeader>

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
            </StyledInternalHeader>

            <ComponentsTable data={filteredData} />
        </div>
    );
};

export default ComponentPage;
