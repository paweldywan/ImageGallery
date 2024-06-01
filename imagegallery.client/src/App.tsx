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
    Form,
    FormGroup,
    Input,
    Label,
    Table
} from 'reactstrap';

import {
    addImage,
    deleteImage,
    getImages
} from './requests';

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

            <Form
                onSubmit={executeAddImage}
                className="mb-3"
            >
                <FormGroup>
                    <Label for="file">File</Label>

                    <Input
                        type="file"
                        name="file"
                        id="file"
                        onChange={event => setImageToAdd(prevState => ({
                            ...prevState,
                            file: event.target.files![0]
                        }))}
                        key={imageToAdd.fileKey}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="title">Title</Label>

                    <Input
                        type="text"
                        name="title"
                        id="title"
                        value={imageToAdd.title}
                        onChange={event => setImageToAdd(prevState => ({
                            ...prevState,
                            title: event.target.value
                        }))}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>

                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={imageToAdd.description}
                        onChange={event => setImageToAdd(prevState => ({
                            ...prevState,
                            description: event.target.value
                        }))}
                    />
                </FormGroup>

                <Button>Upload</Button>
            </Form>

            {contents}
        </Container>
    );
}

export default App;