import React, { useRef, forwardRef, useImperativeHandle, ForwardedRef, useState, useEffect, ChangeEvent } from "react";
import { Button, Modal, TextField } from "@navikt/ds-react";
import { PencilIcon } from "@navikt/aksel-icons";
import { IContact } from "~/data/types";

interface ContactFormProps {
    headerText: string;
    selectedContact: IContact | null;
    onClose: () => void;
}

const ContactForm = forwardRef((props: ContactFormProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const { headerText, selectedContact, onClose } = props;

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        mail: "",
        mobile: "",
        nin: "",
    });

    useEffect(() => {
        if (selectedContact) {
            setFormValues({
                firstName: selectedContact.firstName || "",
                lastName: selectedContact.lastName || "",
                mail: selectedContact.mail || "",
                mobile: selectedContact.mobile || "",
                nin: selectedContact.nin || "",
            });
        }
    }, [selectedContact]);

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
            firstName: "",
            lastName: "",
            mail: "",
            mobile: "",
            nin: "",
        });
    }

    function handleCancelClick() {
        resetFormValues();
        onClose();
    }


    return (
        <Modal ref={ref} header={{ heading: headerText }} width={400}>
            <Modal.Body>
                <form method="dialog" id="skjema" onSubmit={() => alert("onSubmit")}>
                    <TextField
                        label={"Fornavn"}
                        value={formValues.firstName}
                        error={formValues.firstName.length < 1? "Required":""}
                        onChange={onChange}
                        name="firstName"
                    />
                    <TextField
                        label={"Etternavn"}
                        value={formValues.lastName}
                        error={formValues.lastName.length < 1? "Required":""}
                        onChange={onChange}
                        name="lastName"
                    />
                    <TextField
                        label={"E-post"}
                        value={formValues.mail}
                        error={formValues.mail.length < 1? "Required":""}
                        onChange={onChange}
                        name="mail"
                    />
                    <TextField
                        label={"Mobil"}
                        value={formValues.mobile}
                        error={formValues.mobile.length < 1? "Required":""}
                        onChange={onChange}
                        name="mobile"
                    />
                    <TextField
                        label={"Fødselsnummer"}
                        value={formValues.nin}
                        error={formValues.nin.length < 1? "Required":""}
                        onChange={onChange}
                        name="nin"
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="skjema" type="submit">
                    Send
                </Button>
                <Button type="button" variant="secondary" onClick={handleCancelClick}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ContactForm;
