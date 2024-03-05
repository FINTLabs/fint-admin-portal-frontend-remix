//delete-confirm.tsx
import { useState } from "react";
import {Button, Modal, Heading} from "@navikt/ds-react";

interface DeleteConfirmProps {
    deleteName: string;
    f: any;
}
const DeleteConfirm: React.FC<DeleteConfirmProps> = ({ deleteName, f }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (isConfirmed: boolean) => {
        console.log("delete confirmed: ", isConfirmed);
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="danger"
                size="xsmall"
                onClick={() => setOpen(true)}
            >
                Delete {deleteName}
            </Button>

            <Modal
                open={open}
                width="small"
            >
                <Modal.Header closeButton={false}>
                    <Heading size="small">Confirmation</Heading>
                </Modal.Header>
                <Modal.Body>
                    <Heading size="small">Er du sikker på at du vil fjerne: </Heading>

                    <Heading size="medium" spacing>
                        {deleteName}
                    </Heading>
                </Modal.Body>
                <Modal.Footer>
                    <f.Form method="post">
                        <input type="hidden" name="actionType" value="delete" />
                        <input type="hidden" name="deleteName" value={deleteName} />
                    <Button
                        type="submit"
                        variant="danger"
                        onClick={() => handleClose(true)}
                    >
                        Ja, jeg er sikker
                    </Button>

                    </f.Form>

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

export default DeleteConfirm;