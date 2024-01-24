import { useState } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

const DeleteButton = ({ onClose, buttonText }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (isConfirmed) => {
        console.log("handleClose", isConfirmed);
        setOpen(false);
        if (onClose) {
            onClose(isConfirmed);
        }
    };

    return (
        <>
            <Button
                variant="danger"
                size="xsmall"
                onClick={() => setOpen(true)}
            >
                {buttonText}
            </Button>

            <Modal
                open={open}
                //onClose={() => handleClose(false)}
                header={{
                    heading: "Er du sikker?",
                    size: "small",
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
                        incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
                        laborum.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="danger" onClick={() => handleClose(true)}>
                        Ja, jeg er sikker
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => handleClose(false)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteButton;