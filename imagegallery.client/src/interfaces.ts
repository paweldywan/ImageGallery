export interface Image {
    id: number;
    fileName: string;
    extension: string;
    title: string;
    description: string;
    url: string;
}

export interface ImageToAdd {
    title: string;
    description: string;
    file?: File;
    fileKey: number;
}

export interface FormInput<T> {
    field: keyof T;
    type?: 'text' | 'file' | 'textarea';
    label: string;
    key?: keyof T;
}

export interface TableColumn<T> {
    field: keyof T;
    label: string;
    type?: 'image'
}

export interface TableAction<T> {
    label: string;
    onClick: (data: T) => void;
}