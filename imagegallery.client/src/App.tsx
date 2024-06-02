import {
    FormEvent,
    useEffect,
    useState
} from 'react';

import {
    Image,
    ImageGaleryView,
    ImageGallerySettings,
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

import AppGrid from './components/AppGrid';

const App = () => {
    const [data, setData] = useState<Image[]>();

    const [settings, setSettings] = useState<ImageGallerySettings>({
        view: ImageGaleryView.Table
    });

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
        : settings.view === ImageGaleryView.Table ? (
            <AppTable
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
                        field: 'url',
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
            />
        )
            : settings.view === ImageGaleryView.Carousel ? (
                <div>
                    <h1>Carousel</h1>
                </div>
            ) : (
                <AppGrid
                    cards={data.map(image => ({
                        title: image.fileName,
                        subtitle: image.title,
                        text: image.description,
                        image: {
                            alt: image.title,
                            src: image.url
                        },
                        button: {
                            label: 'Delete',
                            onClick: () => executeDeleteImage(image)
                        }
                    }))}
                />
            );

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
                        type: 'textarea',
                        group: 1
                    }
                ]}
                buttonText="Upload"
                data={imageToAdd}
                setData={setImageToAdd}
                onSubmit={executeAddImage}
                className="mb-3"
                rowsProps={[
                    { xs: "1", sm: "2" },
                    { xs: "1", sm: "2" }
                ]}
            />

            <AppForm
                inputs={[
                    {
                        field: 'view',
                        label: 'View',
                        type: 'select',
                        options: [
                            {
                                label: 'Table',
                                value: ImageGaleryView.Table
                            },
                            {
                                label: 'Carousel',
                                value: ImageGaleryView.Carousel
                            },
                            {
                                label: 'Grid',
                                value: ImageGaleryView.Grid
                            }
                        ]
                    }
                ]}
                data={settings}
                setData={setSettings}
                className="mb-3"
                rowsProps={[
                    { xs: "auto" }
                ]}
            />

            {contents}
        </Container>
    );
}

export default App;