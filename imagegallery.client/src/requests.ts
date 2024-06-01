import { Image } from './interfaces';

export const getImages = async () => {
    const response = await fetch('api/image');

    return await response.json();
};

export const addImage = (formData: FormData) =>
    fetch('api/image', {
        method: 'POST',
        body: formData
    });

export const deleteImage = (image: Image) =>
    fetch(`api/image/${image.id}`, {
        method: 'DELETE'
    });
