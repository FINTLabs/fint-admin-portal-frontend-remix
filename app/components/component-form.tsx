// component-form.tsx
import React, {useEffect, useState} from 'react';
import {Box, Button, Switch, TextField} from "@navikt/ds-react";
import {FloppydiskIcon} from '@navikt/aksel-icons';
import type {IErrorState, IComponent} from "~/api/types";
import {defaultComponent} from "~/api/types";

interface ComponentFormProps {
    selectedComponent: any; // Replace `any` with the actual type
    f: any; // Replace `any` with the actual type
    r?: any; // Make `r` optional and replace `any` with the actual type if needed
}

const ComponentForm = ({ selectedComponent, f, r }: ComponentFormProps) => {

    const [formData, setFormData] = useState<IComponent>(selectedComponent);
    const [errors, setErrors] = useState<IErrorState>({});

    useEffect(() => {
        if(f.state === "loading" && !selectedComponent.dn) {
            setFormData(defaultComponent);
        }
    }, [f.state]);

    const handleInputChange = (fieldName: keyof IComponent, value: string | boolean) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSwitchChange = (fieldName: keyof IComponent, checked: boolean) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: checked,
        }));
    };

    const handleInputBlur = (fieldName: keyof IComponent, value: string) => {
        if (fieldName === 'name') {
            let usernameValidator = new RegExp("^[a-zA-Z0-9_-]{3,128}$");
            let valid = usernameValidator.test(value);

            if (valid) {
                removeError('name');
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ["name"]: "Navnet kan bare inneholde a-z, og . (punktum). Det kan fra 3-128 tegn langt"
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
            && formData.name.length > 0
            && formData.basePath.length > 0
            && formData.description.length > 0
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
            {selectedComponent.dn && (
                <input
                    type="hidden"
                    name="dn"
                    value={formData.dn}
                />
            )}

            {selectedComponent.name && (
                <input
                    type="hidden"
                    name="name"
                    value={formData.name}
                />
            )}

            <input
                type="hidden"
                name="actionType"
                value={selectedComponent.dn ? "update" : "create"}
            />

            <TextField
                label="Name"
                value={formData.name}
                name={"name"}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors['name'] || ''}
                onBlur={(e) => handleInputBlur('name', e.target.value)}
                description="Navnet kan bare inneholde a-z, og . (punktum). Det kan fra 3-128 tegn langt"
                disabled={!!selectedComponent.name}
            />
            <TextField
                label="Description"
                name={"description"}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <TextField
                label="Path"
                name={"basePath"}
                value={formData.basePath}
                onChange={(e) => handleInputChange('basePath', e.target.value)}
            />

            Component Type:
            <Switch
                size="small"
                name={"openData"}
                checked={formData.openData}
                // value={formData.openData}
                onChange={(e) => handleSwitchChange('openData', e.target.checked)}
            >
                Open
            </Switch>
            <Switch
                size="small"
                name={"common"}
                checked={formData.common}
                // value={formData.common}
                onChange={(e) => handleSwitchChange('common', e.target.checked)}
            >
                Felles
            </Switch>
            <Switch
                size="small"
                name={"core"}
                // value={formData.core}
                checked={formData.core}
                onChange={(e) => handleSwitchChange('core', e.target.checked)}
            >
                FINT Core
            </Switch>

            Environment:
            <Switch
                size="small"
                name={"inPlayWithFint"}
                // value={formData.inPlayWithFint}
                checked={formData.inPlayWithFint}
                onChange={(e) => handleSwitchChange('inPlayWithFint', e.target.checked)}
            >
                Play With Fint
            </Switch>
            <Switch
                size="small"
                name={"inBeta"}
                // value={formData.inBeta}
                checked={formData.inBeta}
                onChange={(e) => handleSwitchChange('inBeta', e.target.checked)}
            >
                Beta
            </Switch>
            <Switch
                size="small"
                name={"inProduction"}
                // value={formData.inProduction}
                checked={formData.inProduction}
                onChange={(e) => handleSwitchChange('inProduction', e.target.checked)}
            >
                API (Production)
            </Switch>
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

export default ComponentForm;
