import {
    Button,
    Table
} from "reactstrap";

import {
    TableAction,
    TableColumn
} from "../interfaces";

interface Props<T> {
    columns: TableColumn<T>[];
    actions?: TableAction<T>[];
    data: T[];
    keyField: keyof T;
}

const AppTable = <T,>({
    columns,
    actions,
    data,
    keyField
}: Props<T>) => {
    return (
        <Table
            striped
            hover
            responsive
            bordered
            dark
        >
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.field.toString()}>{column.label}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>

            <tbody>
                {data.map(row =>
                    <tr key={String(row[keyField])}>
                        {columns.map(column => (
                            <td key={column.field.toString()}>
                                {column.type === 'image' ? (
                                    <img src={String(row[column.field])} />
                                ) : (
                                    String(row[column.field])
                                )}
                            </td>
                        ))}
                        {actions && (
                            <td>
                                {actions.map(action => (
                                    <Button
                                        key={action.label}
                                        color="link"
                                        onClick={() => action.onClick(row)}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default AppTable;