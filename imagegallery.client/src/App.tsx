import {
    useEffect,
    useState
} from 'react';

import { Image } from './interfaces';

import 'bootstrap/dist/css/bootstrap.css';

import { Container, Table } from 'reactstrap';

const App = () => {
    const [data, setData] = useState<Image[]>();

    useEffect(() => {
        const populateData = async () => {
            const response = await fetch('api/image');

            const data = await response.json();

            setData(data);
        };

        populateData();
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
                </tr>
            </thead>
            <tbody>
                {data.map(image =>
                    <tr key={image.id}>
                        <td>{image.id}</td>
                        <td>{image.fileName}</td>
                        <td>{image.title}</td>
                        <td>{image.description}</td>
                    </tr>
                )}
            </tbody>
        </Table>;

    return (
        <Container fluid>
            <h1>Image gallery</h1>

            {contents}
        </Container>
    );
}

export default App;