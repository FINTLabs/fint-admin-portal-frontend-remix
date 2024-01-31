// component-form.tsx
import React, {useState} from 'react';
import {Box, Button, Switch, TextField} from "@navikt/ds-react";
import {FloppydiskIcon} from '@navikt/aksel-icons';
import type {IComponent} from "~/api/types";
import {defaultComponent} from "~/api/types";

const ComponentForm = ({ selectedComponent = defaultComponent, f, r }) => {

    const [formData, setFormData] = useState<IComponent>(selectedComponent);
    const [errors, setErrors] = useState({});

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSwitchChange = (fieldName, checked) => {

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: checked,
        }));
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
                value={formData.openData}
                onChange={(e) => handleSwitchChange('openData', e.target.checked)}
            >
                Open
            </Switch>
            <Switch
                size="small"
                name={"common"}
                checked={formData.common}
                onChange={(e) => handleSwitchChange('common', e.target.checked)}
            >
                Felles
            </Switch>
            <Switch
                size="small"
                name={"core"}
                value={formData.core}
                onChange={(e) => handleSwitchChange('core', e.target.checked)}
            >
                FINT Core
            </Switch>

            Environment:
            <Switch
                size="small"
                name={"inPlayWithFint"}
                value={formData.inPlayWithFint}
                onChange={(e) => handleSwitchChange('inPlayWithFint', e.target.checked)}
            >
                Play With Fint
            </Switch>
            <Switch
                size="small"
                name={"inBeta"}
                value={formData.inBeta}
                onChange={(e) => handleSwitchChange('inBeta', e.target.checked)}
            >
                Beta
            </Switch>
            <Switch
                size="small"
                name={"inProduction"}
                value={formData.inProduction}
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
