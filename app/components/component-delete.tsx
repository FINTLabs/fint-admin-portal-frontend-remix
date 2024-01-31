//component-delete.tsx
import { useState } from "react";
import {BodyLong, Button, Modal} from "@navikt/ds-react";
import {Form} from "@remix-run/react";

const ComponentDelete = ({ componentName,f }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (isConfirmed) => {
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
                Delete Component
            </Button>

            <Modal
                open={open}
                header={{
                    heading: "Er du sikker?",
                    size: "small",
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        Are you really sure you want to delete this component:
                        {componentName}
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <f.Form method="post">
                        <input type="hidden" name="actionType" value="delete" />
                        <input type="hidden" name="componentName" value={componentName} />
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

export default ComponentDelete;