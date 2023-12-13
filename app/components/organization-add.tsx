import React, {useRef, forwardRef, useImperativeHandle, ForwardedRef, useState, useEffect, ChangeEvent} from "react";
import {Button, Modal, TextField} from "@navikt/ds-react";
import {PencilIcon} from "@navikt/aksel-icons";
import {IOrganization} from "~/api/types";


interface OrganizationFormProps {
    headerText: string;
    selectedOrganization: IOrganization | null;
    onClose: () => void;
}

const OrganizationForm = forwardRef((props: OrganizationFormProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const {headerText, selectedOrganization, onClose} = props;

    const [formValues, setFormValues] = useState({
        name: "",
        displayName: "",
        orgNumber: "",
    });

    useEffect(() => {
        if (selectedOrganization) {
            setFormValues({
                name: selectedOrganization.name || "",
                displayName: selectedOrganization.displayName || "",
                orgNumber: selectedOrganization.orgNumber || "",
            });
        }
    }, [selectedOrganization]);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    function resetFormValues() {
        setFormValues({
            name: "",
            displayName: "",
            orgNumber: "",
        });
    }

    function handleCancelClick() {
        resetFormValues();
        onClose();
    }

    return (
        <Modal ref = {ref} header = {{ heading: headerText }} width = {400}>
            <Modal.Body>
            <form method = "dialog" id = "skjema" onSubmit = {() => alert("onSubmit")}>
                <TextField
                    label = {"Organisasjons navn"}
                    value = {formValues.name}
                    error = {formValues.name.length < 1 ? "Required" : ""}
                    onChange = {onChange}
                    name = "name"
                    />
                    <TextField
                        label = {"Synlig navn"}
                        value = {formValues.displayName}
                        error = {formValues.displayName.length < 1 ? "Required" : ""}
                        onChange = {onChange}
                        name = "displayName"
                    />
                    <TextField
                        label = {"Organisasjons nummer"}
                        value = {formValues.orgNumber}
                        error = {formValues.orgNumber.length < 1 ? "Required" : ""}
                        onChange = {onChange}
                        name = "orgNumber"
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button form = "skjema" type = "submit" >
                    Send
                </Button>
                <Button type = "button" variant = "secondary" onClick = {handleCancelClick} >
                    Avbryt
                </Button>
                </Modal.Footer>
        </Modal>
    );
});


export default OrganizationForm;
