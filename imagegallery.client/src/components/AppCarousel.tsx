import {
    useState
} from "react";

import {
    CarouselItem,
    CarouselCaption,
    CarouselIndicators,
    CarouselControl,
    Carousel
} from "reactstrap";

import { CarouselElement } from "../interfaces";

interface Props {
    items: CarouselElement[];
}

const AppCarousel = ({
    items,
    ...other
}: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;

        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;

        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;

        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;

        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex: number) => {
        if (animating) return;

        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
        >
            <img src={item.src} alt={item.altText} />

            {item.header &&
                <CarouselCaption
                    captionText={item.text}
                    captionHeader={item.header}
                />}
        </CarouselItem>
    ));

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            dark
            {...other}
        >
            <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />

            {slides}

            <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />

            <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default AppCarousel;