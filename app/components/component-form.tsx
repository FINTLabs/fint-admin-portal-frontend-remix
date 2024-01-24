import React, { useState } from 'react';
import {Switch, TextField, Button, Box, Alert} from "@navikt/ds-react";
import { FloppydiskIcon } from '@navikt/aksel-icons';
import ComponentApi from "~/api/component-api";
import type {IComponent} from "~/api/types";


const ComponentForm = ({ selectedComponent = {} as IComponent }) => {
    const [formData, setFormData] = useState<IComponent>({
        name: selectedComponent.name || '',
        description: selectedComponent.description || '',
        basePath: selectedComponent.basePath || '',
        openData: selectedComponent.openData || false,
        common: selectedComponent.common || false,
        core: selectedComponent.core || false,
        inPlayWithFint: selectedComponent.inPlayWithFint || false,
        inBeta: selectedComponent.inBeta || false,
        inProduction: selectedComponent.inProduction || false,
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'error' });

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        // setFormChanged(true);
    };

    const handleSwitchChange = (fieldName, value) => {

        if (value === 'on') {
            value = true;
        } else {
            value = false;
        }

        console.log("handleInputChange", fieldName, value);

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        // setFormChanged(true);
    };

    const handleInputBlur = (fieldName, value) => {
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
            && formData.name.length > 0
            && formData.basePath.length > 0
            && formData.description.length > 0
        );
    }

    const handleSave = async () => {
        if (validateForm()) {

            setIsSubmitting(true);
            ComponentApi.createComponent(formData)
                .then(response => {
                    if (response && response.status === 201) {
                        // Notify component creation success
                        console.log("Komponenten ble opprettet");
                    } else if (response && response.status === 302) {
                        // Notify if component already exists
                        console.log("Komponenten finnes fra før");
                    } else {
                        // Notify error
                        console.log("Det oppsto en feil ved opprettelse av komponenten.");
                    }
                })
                .catch(() => {
                    // Notify error
                    console.log("Det oppsto en feil ved opprettelse av komponenten.");
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }

    };

    return (
        <form method="dialog" id="skjema">
            {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

            <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors['name'] || ''}
                onBlur={(e) => handleInputBlur('name', e.target.value)}
                description="Navnet kan bare inneholde a-z, og . (punktum). Det kan fra 3-128 tegn langt"
            />
            <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <TextField
                label="Path"
                value={formData.basePath}
                onChange={(e) => handleInputChange('basePath', e.target.value)}
            />

            Component Type:
            <Switch
                size="small"
                defaultChecked={formData.openData}
                onChange={(e) => handleSwitchChange('openData', e.target.value)}
            >
                Open
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.common}
                onChange={(e) => handleSwitchChange('common', e.target.value)}
            >
                Felles
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.core}
                onChange={(e) => handleSwitchChange('core', e.target.value)}
            >
                FINT Core
            </Switch>

            Environment:
            <Switch
                size="small"
                defaultChecked={formData.inPlayWithFint}
                onChange={(e) => handleSwitchChange('inPlayWithFint', e.target.value)}
            >
                Play With Fint
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.inBeta}
                onChange={(e) => handleSwitchChange('inBeta', e.target.value)}
            >
                Beta
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.inProduction}
                onChange={(e) => handleSwitchChange('inProduction', e.target.value)}
            >
                API (Production)
            </Switch>
            <Box padding={"4"} >
                {isSubmitting ? (
                    <Button loading>Loading</Button>
                ) : (
                    <Button
                        icon={<FloppydiskIcon aria-hidden />}
                        disabled={!validateForm()}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                )}
            </Box>
        </form>


    );
};

export default ComponentForm;
