import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Button, Modal, TextField } from "@navikt/ds-react";
import { PencilIcon } from "@navikt/aksel-icons";

const CustomFormModal = forwardRef(({ headerText, onClose }, ref) => {
    const internalRef = useRef<HTMLDialogElement>(null);

    // useImperativeHandle(ref, () => ({
    //     showModal: () => internalRef.current?.showModal(),
    //     close: () => internalRef.current?.close(),
    // }));

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

    return (
        <Modal ref={ref} header={{ heading: headerText }} width={400}>
            <Modal.Body>
                <form method="dialog" id="skjema" onSubmit={handleSubmit}>
                    <TextField label="Har du noen tilbakemeldinger?" />
                    {/* Add more form fields as needed */}
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

export default CustomFormModal;