import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Button, TextField } from "@navikt/ds-react";
import { FloppydiskIcon } from '@navikt/aksel-icons';
import type { IOrganization, IErrorState } from "~/api/types";
import { defaultOrganization } from "~/api/types";
interface OrganizationFormProps {
    selected: IOrganization;
    f: any; // Replace `any` with the actual type
    r?: any;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ selected, f, r }) => {
    const [formData, setFormData] = useState<IOrganization>(selected || defaultOrganization);
    const [errors, setErrors] = useState<IErrorState>({});

    useEffect(() => {
        if (f.state === "loading" && !selected.dn) {
            setFormData(defaultOrganization);
        }
    }, [f.state, selected.dn]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value && value.length > 0) {
            removeError(name);
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "Required"
            }));
        }
    };

    const removeError = (fieldName: string) => {
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    function validateForm() {
        return (
            Object.keys(errors).length === 0 &&
            formData.displayName.length > 0 &&
            formData.name.length > 0 &&
            formData.orgNumber.length > 0
        );
    }
    const handleSubmit = () => {
        if (r && r.current) {
            r.current.close();
        }
    };

    return (
        <f.Form method="post">

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
                onChange={(e) => handleInputChange(e)}
                error={errors['name'] || ''}
                onBlur={(e) => handleInputBlur(e)}
                disabled={!!selected.name}
            />
            <TextField
                label="Vist navn"
                name={"displayName"}
                value={formData.displayName}
                error={errors['displayName'] || ''}
                onChange={(e) => handleInputChange(e)}
            />
            <TextField
                label="Organisasjonsnummer"
                name={"orgNumber"}
                value={formData.orgNumber}
                error={errors['orgNumber'] || ''}
                onChange={(e) => handleInputChange(e)}
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
