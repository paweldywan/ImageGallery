export interface Image {
    id: number;
    fileName: string;
    extension: string;
    title: string;
    description: string;
}

export interface ImageToAdd {
    title: string;
    description: string;
    file?: File;
    fileKey: number;
}