import {
    FormEvent,
    useEffect,
    useState
} from 'react';

import {
    Image,
    ImageToAdd
} from './interfaces';

import 'bootstrap/dist/css/bootstrap.css';

import {
    Container,
} from 'reactstrap';

import {
    addImage,
    deleteImage,
    getImages
} from './requests';

import AppForm from './components/AppForm';

import AppTable from './components/AppTable';

const App = () => {
    const [data, setData] = useState<Image[]>();

    const [imageToAdd, setImageToAdd] = useState<ImageToAdd>({
        title: '',
        description: '',
        fileKey: Date.now()
    });

    const executeGetImages = async () => {
        const data = await getImages();

        setData(data);
    };

    const executeAddImage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('file', imageToAdd.file!);

        formData.append('title', imageToAdd.title);

        formData.append('description', imageToAdd.description);

        await addImage(formData);

        await executeGetImages();

        setImageToAdd({
            title: '',
            description: '',
            file: undefined,
            fileKey: Date.now()
        });
    };

    const executeDeleteImage = async (image: Image) => {
        await deleteImage(image);

        await executeGetImages();
    };

    useEffect(() => {
        executeGetImages();
    }, []);

    const contents = data === undefined
        ? <p><em>Loading...</em></p>
        : <AppTable
            columns={[
                {
                    field: 'id',
                    label: 'Id'
                },
                {
                    field: 'fileName',
                    label: 'FileName'
                },
                {
                    field: 'title',
                    label: 'Title'
                },
                {
                    field: 'description',
                    label: 'Description'
                },
                {
                    label: 'Image',
                    type: 'image'
                }
            ]}
            data={data}
            keyField="id"
            actions={[
                {
                    label: 'Delete',
                    onClick: executeDeleteImage
                }
            ]}
        />;

    return (
        <Container fluid>
            <h1>Image gallery</h1>

            <AppForm
                inputs={[
                    {
                        field: 'file',
                        label: 'File',
                        type: 'file',
                        key: 'fileKey'
                    },
                    {
                        field: 'title',
                        label: 'Title'
                    },
                    {
                        field: 'description',
                        label: 'Description',
                        type: 'textarea'
                    }
                ]}
                buttonText="Upload"
                data={imageToAdd}
                setData={setImageToAdd}
                onSubmit={executeAddImage}
                className="mb-3"
            />

            {contents}
        </Container>
    );
}

export default App;