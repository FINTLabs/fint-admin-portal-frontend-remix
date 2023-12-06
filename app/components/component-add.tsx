import React, { forwardRef } from "react";
import {Button, Checkbox, CheckboxGroup, Modal, Switch, TextField} from "@navikt/ds-react";

const ComponentForm = forwardRef(({ headerText, onClose }, ref) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("contact form submitted")
        onClose();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        console.log("contact form canceled")
        onClose();
    };

    const handleChange = (val: any[]) => console.log(val);

    return (
        <Modal ref={ref} header={{ heading: headerText }} width={400}>
            <Modal.Body>
                <form method="dialog" id="skjema" onSubmit={handleSubmit}>
                    <TextField label="Name" />
                    <TextField label="Description" />
                    <TextField label="Path" />
                    Component Type:
                    <Switch size="small">Open</Switch>
                    <Switch size="small">Felles</Switch>
                    <Switch size="small">FINT Core</Switch>
                    Environment:
                    <Switch size="small">Play With Fint</Switch>
                    <Switch size="small">Beta</Switch>
                    <Switch size="small">API (Production)</Switch>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="skjema">Send</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ComponentForm;