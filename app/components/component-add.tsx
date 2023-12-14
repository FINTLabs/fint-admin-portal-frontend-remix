import type {ForwardedRef} from "react";
import React, { forwardRef} from "react";
import {Button, Modal, Switch, TextField} from "@navikt/ds-react";

interface ComponentFormProps {
    headerText: string;
    onClose: () => void;
}

const ComponentForm = forwardRef((props: ComponentFormProps, ref: ForwardedRef<HTMLDialogElement>) => {

    const { headerText, onClose } = props;

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("contact form submitted")
        onClose();
    };

    const handleCancel = (e:any) => {
        e.preventDefault();
        console.log("contact form canceled")
        onClose();
    };
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