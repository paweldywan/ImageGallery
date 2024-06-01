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
    Button,
    Container,
    Table
} from 'reactstrap';

import {
    addImage,
    deleteImage,
    getImages
} from './requests';

import AppForm from './components/AppForm';

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

    const executeDeleteImage = async (id: number) => {
        await deleteImage(id);

        await executeGetImages();
    };

    useEffect(() => {
        executeGetImages();
    }, []);

    const contents = data === undefined
        ? <p><em>Loading...</em></p>
        : <Table
            striped
            hover
            responsive
            bordered
            dark
        >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>FileName</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(image =>
                    <tr key={image.id}>
                        <td>{image.id}</td>
                        <td>{image.fileName}</td>
                        <td>{image.title}</td>
                        <td>{image.description}</td>
                        <td>
                            <img src={`Images/${image.id}${image.extension}`} />
                        </td>
                        <td>
                            <Button
                                color="link"
                                onClick={() => executeDeleteImage(image.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>;

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