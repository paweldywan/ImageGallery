import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    RowProps
} from "reactstrap";

import { FormInput } from "../interfaces";

interface Props<T> {
    inputs: FormInput<T>[];
    buttonText?: string;
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    rowsProps?: RowProps[];
}

const AppForm = <T,>({
    inputs,
    buttonText,
    data,
    setData,
    onSubmit,
    className,
    rowsProps
}: Props<T>) => {
    return (
        <Form
            onSubmit={onSubmit}
            className={className}
        >
            {[...new Set(inputs.map(i => i.group))].map((group, i) => (
                <Row {...(rowsProps && rowsProps[i])}>
                    {inputs.filter(i => i.group === group).map(input => (
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
                                    [input.field]: input.type === 'file' ? event.target.files![0] : input.type === 'select' ? Number(event.target.value) : event.target.value
                                }))}
                            >
                                {input.type === 'select' ? input.options?.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                )) : null}
                            </Input>
                        </FormGroup>
                    ))}
                </Row>
            ))
            }

            {buttonText && <Button>{buttonText}</Button>}
        </Form >
    );
};

export default AppForm;