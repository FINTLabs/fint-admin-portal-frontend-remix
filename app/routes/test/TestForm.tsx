import { useForm } from 'react-hook-form';
import React from "react";

export const TestForm = ({ selectedComponent = {},f }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: selectedComponent
    });

    const onSubmit = data => {
        // Handle form submission
    };

    return (
        <f.Form method="post">
            {/* form fields */}
            <button type="submit">Submit</button>
        </f.Form>
    );
};