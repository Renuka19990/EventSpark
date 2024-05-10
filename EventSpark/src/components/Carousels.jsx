import  { useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import ElegantButton from "./Button"; // Path to ElegantButton component

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const sliderRef = useRef(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const cards = [
    {
      //   title: "Step Into a World of Wonder: Discover Our Exclusive Event!",
      //   text: "https://cdn.pixabay.com/photo/2015/11/22/19/04/crowd-1056764_1280.jpg",
      image:
        "https://cdn.pixabay.com/photo/2020/06/08/16/19/woman-5275027_1280.jpg",
    },
    {
      //   title: "Design Projects 2",
      //   text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        "https://cdn.pixabay.com/photo/2022/06/02/15/01/music-7238254_1280.jpg",
    },
    {
      //   title: "Design Projects 3",
      //   text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        "https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg",
    },
  ];

  return (
    <Box position={"relative"} height={"600px"} width={"full"} overflow={"hidden"}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        color='white'
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={goToPrevSlide}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      <IconButton
        color='white'
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={goToNextSlide}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={sliderRef}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"600px"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            borderRadius="md"
            boxShadow="lg"
            _hover={{ boxShadow: "xl" }}
          >
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                color="white" // Text color
              >
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }}>{card.text}</Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
      {/* Button at the middle bottom */}
      <Box position="absolute" bottom="20px" left="50%" transform="translateX(-50%)">
        <ElegantButton />
      </Box>
    </Box>
  );
}
