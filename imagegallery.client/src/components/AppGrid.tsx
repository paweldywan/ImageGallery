import {
    Card,
    Col,
    Row,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from "reactstrap";

import {
    GridCard
} from "../interfaces";

interface Props {
    cards: GridCard[];
}

const AppGrid = ({
    cards
}: Props) => {
    return (
        <Row>
            {cards.map((card, i) => (
                <Col key={i} className="my-2" xs="auto">
                    <Card inverse color="dark">
                        {card.image && <img src={card.image.src} alt={card.image.alt} />}

                        <CardBody>
                            {card.title &&
                                <CardTitle tag="h5">
                                    {card.title}
                                </CardTitle>}

                            {card.subtitle &&
                                <CardSubtitle
                                    className="mb-2"
                                    tag="h6"
                                >
                                    {card.subtitle}
                                </CardSubtitle>}

                            {card.text &&
                                <CardText>
                                    {card.text}
                                </CardText>}

                            {card.button &&
                                <Button
                                    onClick={card.button.onClick}
                                >
                                    {card.button.label}
                                </Button>}
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default AppGrid;