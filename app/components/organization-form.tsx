import React, {useEffect, useState} from 'react';
import {Box, Button,  TextField} from "@navikt/ds-react";
import {FloppydiskIcon} from '@navikt/aksel-icons';
import type {IOrganization} from "~/api/types";
import {defaultOrganization} from "~/api/types";

const OrganizationForm = ({ selected, f, r }) => {

    const [formData, setFormData] = useState<IOrganization>(selected);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(f.state === "loading" && !selected.dn) {
            setFormData(defaultOrganization);
        }
    }, [f.state]);


    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleInputBlur = (fieldName, value) => {
            if (value && value.length > 0) {
                removeError(fieldName);
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [fieldName]: "Required"
                }));
            }
    };

    const removeError = (fieldName) => {
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    function validateForm() {
        return (
            Object.keys(errors).length === 0
            && formData.displayName.length > 0
            && formData.name.length > 0
            && formData.orgNumber.length > 0
        );
    }

    const handleSubmit = () => {
        // Close the modal if the ref is provided
        if (r && r.current) {
            r.current.close();
        }
    };

    return (
        <f.Form method="post" >

            <input
                type="hidden"
                name="actionType"
                value={selected.dn ? "update" : "create"}
            />

            {selected.dn && (
                <input
                    type="hidden"
                    name="dn"
                    value={selected.dn}
                />
            )}

            {selected.dn && (
                <input
                    type="hidden"
                    name="name"
                    value={selected.name}
                />
            )}


            <TextField
                label="Domenenavn (f.eks. rfk.no)"
                value={formData.name}
                name={"name"}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors['name'] || ''}
                onBlur={(e) => handleInputBlur('name', e.target.value)}
                disabled={!!selected.name}
            />
            <TextField
                label="Vist navn"
                name={"displayName"}
                value={formData.displayName}
                error={errors['displayName'] || ''}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
            />
            <TextField
                label="Organisasjonsnummer"
                name={"orgNumber"}
                value={formData.orgNumber}
                error={errors['orgNumber'] || ''}
                onChange={(e) => handleInputChange('orgNumber', e.target.value)}
            />

            <Box padding={"4"} >
                <Button
                    icon={<FloppydiskIcon aria-hidden />}
                    disabled={!validateForm()}
                    type={"submit"}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Box>
        </f.Form>

    );
};

export default OrganizationForm;
