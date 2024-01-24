import { useForm } from 'react-hook-form';

export const TestForm = ({ selectedComponent = {} }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: selectedComponent
    });

    const onSubmit = data => {
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" ref={register} />
            {/* other fields */}
            <button type="submit">Submit</button>
        </form>
    );
};