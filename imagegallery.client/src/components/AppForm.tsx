import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import { FormInput } from "../interfaces";

interface Props<T> {
    inputs: FormInput<T>[];
    buttonText: string;
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

const AppForm = <T,>({
    inputs,
    buttonText,
    data,
    setData,
    onSubmit,
    className
}: Props<T>) => {
    return (
        <Form
            onSubmit={onSubmit}
            className={className}
        >
            {inputs.map(input => (
                <FormGroup key={input.field.toString()}>
                    <Label for={input.field.toString()}>{input.label}</Label>

                    <Input
                        key={input.key && String(data[input.key])}
                        type={input.type}
                        name={input.field.toString()}
                        id={input.field.toString()}
                        value={input.type === 'file' ? undefined : String(data[input.field])}
                        onChange={event => setData(prevState => ({
                            ...prevState,
                            [input.field]: input.type === 'file' ? event.target.files![0] : event.target.value
                        }))}
                    />
                </FormGroup>
            ))}

            <Button>{buttonText}</Button>
        </Form>
    );
};

export default AppForm;