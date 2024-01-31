import type {ChangeEvent, ForwardedRef} from "react";
import React, { forwardRef, useEffect, useState} from "react";
import {Button, Modal, TextField} from "@navikt/ds-react";
import type {IContact} from "~/api/types";
import {defaultContact} from "~/api/types";

interface ContactFormProps {
    headerText: string;
    selectedContact: IContact | null;
    onClose: () => void;
}

const ContactForm = forwardRef((props: ContactFormProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const { headerText, selectedContact, onClose } = props;
    const [formValues, setFormValues] = useState<IContact>(selectedContact || defaultContact);

    // const [formValues, setFormValues] = useState({
    //     firstName: "",
    //     lastName: "",
    //     mail: "",
    //     mobile: ""
    // });

    // useEffect(() => {
    //     if (selectedContact) {
    //         setFormValues({
    //             firstName: selectedContact.firstName || "",
    //             lastName: selectedContact.lastName || "",
    //             mail: selectedContact.mail || "",
    //             mobile: selectedContact.mobile || ""
    //         });
    //     }
    // }, [selectedContact]);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    // function resetFormValues() {
    //         setFormValues({
    //             firstName: selectedContact?.firstName,
    //             lastName: selectedContact?.lastName,
    //             mail: selectedContact?.mail,
    //             mobile: selectedContact?.mobile
    //         });
    //     }

    function handleCancelClick() {
        // resetFormValues()
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

// ContactForm.displayName = 'ContactForm';
export default ContactForm;