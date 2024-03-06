import type {ChangeEvent} from "react";
import React, {useEffect, useState} from "react";
import {Box, Button, HGrid, TextField} from "@navikt/ds-react";
import type {IContact, IErrorState} from "~/api/types";
import {FloppydiskIcon, TrashIcon} from "@navikt/aksel-icons";
import {defaultContact} from "~/api/types";

interface ContactFormProps {
    selectedContact: IContact;
    f: any; // Replace `any` with the actual type
    r?: any;
}
const ContactForm: React.FC<ContactFormProps> = ({ selectedContact, f, r }) => {
    const [formData, setFormData] = useState<IContact>(selectedContact);
    const [errors, setErrors] = useState<IErrorState>({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [actionType, setActionType] = useState("unknown");

    useEffect(() => {

        if(f.state === "loading" && !selectedContact.dn) {
            setFormData(defaultContact);
        }
    }, [f.state]);

    useEffect(() => {
        setFormData(selectedContact);
        setConfirmDelete(false);
        setActionType(selectedContact.dn ? "update" : "create");
    }, [selectedContact]);


    // function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //
    //     setFormData((prevValues) => ({
    //         ...prevValues,
    //         [name]: value,
    //     }));
    // }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
        let fieldName = e.target.name;
        let value = e.target.value;

        if (fieldName === 'firstName' || fieldName === 'lastName') {

            let nameValidator = new RegExp("^[a-zA-Z ]+$");
            let valid = nameValidator.test(value);

            if (valid) {
                removeError(fieldName); // Adjusted to use fieldName dynamically
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [fieldName]: "Navnet kan bare inneholde a-z og mellomrom" // Adjusted error message
                }));
            }
        } else if (fieldName === 'mail') {

            let emailValidator = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
            let valid = emailValidator.test(value);

            if (valid) {
                removeError('mail');
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ["mail"]: "Ugyldig e-postadresse" // Error message for invalid email
                }));
            }
        } else if (fieldName === 'nin') {

            let ninValidator = new RegExp("^\\d{11}$");
            let valid = ninValidator.test(value);

            if (valid) {
                removeError('nin');
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ["nin"]: "Ugyldig Fødselsnummer"
                }));
            }
        }

    };

    const removeError = (fieldName: keyof IErrorState) => {
        setErrors((prevErrors: IErrorState) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    function validateForm() {
        return (
            Object.keys(errors).length === 0
            && formData.firstName.length > 0
            && formData.lastName.length > 0
            && formData.mail.length > 0
        );
    }

    const handleSubmit = () => {
        if (confirmDelete) {
            setActionType("delete");
        }

        if (r && r.current) {
            r.current.close();
        }
    };

    function handleDelete() {
        setActionType("delete");
        setConfirmDelete(true);
    }

    const handleCancelDelete = () => {
        setConfirmDelete(false);
        setActionType(selectedContact.dn ? "update" : "create");
    };

    return (

        <f.Form method="post" >
            <input
                type="hidden"
                name="actionType"
                value={actionType}
            />

            {selectedContact.dn && (
                <input
                    type="hidden"
                    name="dn"
                    value={selectedContact.dn}
                />
            )}

            {selectedContact.dn && (
                <input
                    type="hidden"
                    name="nin"
                    value={formData.nin}
                />
            )}

            <TextField
                label={"Fødselsnummer"}
                value={formData.nin}
                name={"nin"}
                onChange={(e) => handleInputChange(e)}
                error={errors['nin'] || ''}
                onBlur={(e) => handleInputBlur(e)}
                disabled={!!selectedContact.dn}
            />

            <TextField
                label={"Fornavn"}
                value={formData.firstName}
                onChange={(e) => handleInputChange(e)}
                error={errors['firstName'] || ''}
                onBlur={(e) => handleInputBlur(e)}
                name="firstName"
            />
            <TextField
                label={"Etternavn"}
                value={formData.lastName}
                name="lastName"
                onChange={(e) => handleInputChange(e)}
                error={errors['lastName'] || ''}
                onBlur={(e) => handleInputBlur(e)}
            />
            <TextField
                label={"Epost"}
                value={formData.mail}
                name="mail"
                onChange={(e) => handleInputChange(e)}
                error={errors['mail'] || ''}
                onBlur={(e) => handleInputBlur(e)}
            />

            <TextField
                label={"Mobil"}
                value={formData.mobile}
                name="mobile"
                onChange={(e) => handleInputChange(e)}
                error={errors['mobile'] || ''}
                onBlur={(e) => handleInputBlur(e)}
            />

            <Box padding={"4"} display="flex" gap="4">
                <Button
                    icon={<FloppydiskIcon aria-hidden />}
                    disabled={!validateForm()}
                    type={"submit"}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Box>
            <HGrid gap="6" columns={2}>
                {selectedContact.dn && (
                    <>
                    {!confirmDelete && (
                        <Button
                            variant="danger"
                            icon={<TrashIcon aria-hidden />}
                            onClick={handleDelete}
                            type={"button"}
                            size="xsmall"
                        >
                            Slett contact
                        </Button>
                    )}
                        {confirmDelete && (
                            <>
                                <Button
                                    variant="secondary"
                                    onClick={handleCancelDelete}
                                    size="xsmall"
                                    type={"button"}
                                >
                                    Avbryt
                                </Button>
                                <Button
                                    variant="danger"
                                    icon={<TrashIcon aria-hidden />}
                                    onClick={handleSubmit}
                                    size="xsmall"
                                >
                                    Er du sikker?
                                </Button>
                            </>

                        )}


                    </>
                )}
            </HGrid>

        </f.Form>


    );
}
export default ContactForm;