import React, {useEffect, useRef, useState} from "react";
import {Alert, InternalHeader, Modal, Search, Spacer} from "@navikt/ds-react";
import OrganizationApi from "~/api/organization-api";
import OrganizationTable from "~/components/organization-table";
import {PersonPlusIcon} from "@navikt/aksel-icons";
import OrganizationForm from "~/components/organization-form";
import {defaultOrganization, IFetcherResponseData, IOrganization} from "~/api/types";
import {type ActionFunctionArgs, json} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";

export const loader = async () => {

    try {
        const organizationData = await OrganizationApi.fetch();
        return json({ organizationData });
    } catch (error) {
        throw new Error("Error fetching organizations");
    }

};

export async function action({request}: ActionFunctionArgs) {

    const formData = await request.formData();
    const formValues: Record<string, FormDataEntryValue> = {};

    for (const [key, value] of formData) {
        formValues[key] = value;
    }

    const response = await OrganizationApi.create(formValues);
    return json({ show: true, message: response.message, variant: response.variant });

}

interface LoaderData {
    organizationData: IOrganization[];
}

export default function OrganizationPage() {
    const organizationEditRef = useRef<HTMLDialogElement>(null!);
    const [filteredData, setFilteredData] = useState<IOrganization[]>([]);
    const [search, setSearch] = useState<string>("");
    const loaderData = useLoaderData<LoaderData>();
    const organizations = loaderData.organizationData;
    const [show, setShow] = React.useState(false);
    const fetcher = useFetcher();
    const actionData = fetcher.data as IFetcherResponseData;

    useEffect(() => {
        if (actionData && actionData.show) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [fetcher.data]);

    const handleSearchInput = (input: any) => {
        setSearch(input);
        const filtered = organizations.filter(
            (row) =>
                row.name.toLowerCase().includes(input.toLowerCase()) ||
                row.displayName.toLowerCase().includes(input.toLowerCase()) ||
                row.orgNumber.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>

            <Modal ref={organizationEditRef} header={{ heading: "Legg til ny organisasjon" }} width={400}>
                <Modal.Body>
                    <OrganizationForm
                        selected={defaultOrganization}
                        f={fetcher}
                        r={organizationEditRef}
                    />
                </Modal.Body>
            </Modal>

            {actionData && show && (
                <Alert variant={actionData.variant as "error" | "info" | "warning" | "success"} closeButton onClose={() => setShow(false)}>
                    {actionData.message || "Content"}
                </Alert>
            )}

            <InternalHeader>
                <InternalHeader.Button onClick={() => organizationEditRef.current?.showModal()}>
                    <PersonPlusIcon title="a11y-title" fontSize="1.5rem" />
                    Legg til ny
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
                        id={"searchField"}
                        label="InternalHeader søk"
                        size="medium"
                        variant="simple"
                        placeholder="Søk"
                        onChange={handleSearchInput}
                    />
                </form>
            </InternalHeader>

            <OrganizationTable data={search!= ""? filteredData:organizations} />
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <>
            <p>Something went wrong.</p>
            <p>{error?.message}</p>
        </>
    );
}