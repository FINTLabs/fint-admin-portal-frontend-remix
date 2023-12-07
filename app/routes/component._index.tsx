import React, {useRef} from 'react';
import styled from 'styled-components';
import { InternalHeader, Spacer, Search } from "@navikt/ds-react";
import {ComponentIcon, PersonPlusIcon} from "@navikt/aksel-icons";
import ComponentsTable from "~/components/components-table";
import components from "~/data/components";
import CustomFormModal from "~/components/contact-add";
import ComponentAdd from "~/components/component-add";

// Styled InternalHeader
const StyledInternalHeader = styled(InternalHeader)`
  --ac-internalheader-bg: var(--a-surface-inverted);
  --ac-internalheader-divider: var(--a-gray-600);
  --ac-internalheader-text: var(--a-text-on-inverted);
  --ac-internalheader-hover-bg: var(--a-surface-inverted-hover);
  --ac-internalheader-active-bg: var(--a-surface-inverted-active);

`;
// Styled Search
const StyledSearch = styled(Search)`
  input {
    --ac-textfield-bg: var(--a-border-subtle);
    --ac-textfield-border: var(--a-border-default);
    --ac-textfield-text: var(--a-text-default);
    --ac-textfield-placeholder: var(--a-text-subtle);
    --ac-textfield-hover-border: var(--a-border-action);
    --ac-textfield-error-border: var(--a-border-danger);

  }
`;

const ComponentPage = () => {
    const componentEditRef = useRef<HTMLDialogElement>(null);

    const handleFormClose = () => {
        // Handle form submission logic
        console.log("closing the contact add form inside index");
        componentEditRef?.current?.close();
    };

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
                    <StyledSearch
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                    />
                </form>
            </StyledInternalHeader>

            <ComponentsTable data={components} />
        </div>
    );
};

export default ComponentPage;
