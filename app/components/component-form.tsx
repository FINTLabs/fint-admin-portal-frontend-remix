import React, { useState, useEffect } from 'react';
import {Switch, TextField, Button, Box} from "@navikt/ds-react";
import { FloppydiskIcon } from '@navikt/aksel-icons';

const ComponentForm = ({ selectedComponent }) => {
    const [formData, setFormData] = useState({
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

    const [formChanged, setFormChanged] = useState(false);

    const handleInputChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
        setFormChanged(true);
    };

    const handleSave = () => {
        // Implement your save logic here
        // You can use the formData to send the updated data to your backend
        // Reset formChanged to false after saving
        setFormChanged(false);
    };

    // Listen for changes in formData to enable or disable the Save button
    useEffect(() => {
        setFormChanged(false); // Reset formChanged when selectedComponent changes
    }, [selectedComponent]);

    return (
        <form method="dialog" id="skjema">
            <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
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
                onChange={(checked) => handleInputChange('openData', checked)}
            >
                Open
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.common}
                onChange={(checked) => handleInputChange('common', checked)}
            >
                Felles
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.core}
                onChange={(checked) => handleInputChange('core', checked)}
            >
                FINT Core
            </Switch>

            Environment:
            <Switch
                size="small"
                defaultChecked={formData.inPlayWithFint}
                onChange={(checked) => handleInputChange('inPlayWithFint', checked)}
            >
                Play With Fint
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.inBeta}
                onChange={(checked) => handleInputChange('inBeta', checked)}
            >
                Beta
            </Switch>
            <Switch
                size="small"
                defaultChecked={formData.inProduction}
                onChange={(checked) => handleInputChange('inProduction', checked)}
            >
                API (Production)
            </Switch>
            <Box padding={"4"} >
                <Button
                    icon={<FloppydiskIcon aria-hidden />}
                    disabled={!formChanged}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </form>


    );
};

export default ComponentForm;
