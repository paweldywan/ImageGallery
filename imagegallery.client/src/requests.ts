export const getImages = async () => {
    const response = await fetch('api/image');

    return await response.json();
};

export const addImage = (formData: FormData) =>
    fetch('api/image', {
        method: 'POST',
        body: formData
    });

export const deleteImage = (id: number) =>
    fetch(`api/image/${id}`, {
        method: 'DELETE'
    });
