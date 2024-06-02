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

interface Option {
    value: number;
    label: string;
}

export interface FormInput<T> {
    field: keyof T;
    type?: 'text' | 'file' | 'textarea' | 'select';
    label: string;
    key?: keyof T;
    options?: Option[];
    group?: number;
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

export enum ImageGaleryView {
    Table,
    Grid,
    Carousel
}

export interface ImageGallerySettings {
    view: ImageGaleryView;
}

export interface GridButton {
    label: string;
    onClick: () => void;
}
export interface GridImage {
    alt: string;
    src: string;
}

export interface GridCard {
    title?: string;
    subtitle?: string;
    text?: string;
    button?: GridButton;
    image?: GridImage;
}

export interface CarouselElement {
    src: string;
    altText: string;
    header?: string;
    text?: string;
}