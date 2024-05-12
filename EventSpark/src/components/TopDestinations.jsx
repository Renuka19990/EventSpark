/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const TopDestinationsIndia = () => {
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const destinations = [
    {
      name: "Varanasi",
      image:
        "https://media.istockphoto.com/id/516984446/photo/varanasi-burning-grounds-at-night.webp?b=1&s=170667a&w=0&k=20&c=RcYRzJ6lvKpRw8u7mU1qjJSTI-mrNo_tii1I0p6U7uc=",
    },
    {
      name: "Agra",
      image:
        "https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.webp?b=1&s=170667a&w=0&k=20&c=TAvgjXvErPolHwC8PUELsfS2UKEfgtVO-RR82bP9zBQ=",
    },
    {
      name: "Jaipur",
      image:
        "https://media.istockphoto.com/id/1291961188/photo/stunning-view-of-the-hawa-mahal-at-sunset-with-blurred-people-walking-during-the-covid-19.webp?b=1&s=170667a&w=0&k=20&c=1R04uRuM5PbsYSSNE8sPQdqB2z7Pp6vN1D2TA-VsBIQ=",
    },
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Udaipur",
      image:
        "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fHww",
    },
    {
      name: "Ladakh",
      image:
        "https://images.unsplash.com/photo-1569092122680-4a491077bab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGxhZGFraHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Hampi",
      image:
        "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFtcGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Rishikesh",
      image:
        "https://media.istockphoto.com/id/1027228942/photo/rishikesh-in-india.webp?b=1&s=170667a&w=0&k=20&c=ibdAUlkgi5MneSSblkEyG3K0zvvWARttZe1vAwHHqVA=",
    },
    {
      name: "Jodhpur",
      image:
        "https://media.istockphoto.com/id/533453030/photo/jodhpur-market.webp?b=1&s=170667a&w=0&k=20&c=lfTL808YZCQp3FjUhEk03I3V523DvZX8uJr5B90jGzs=",
    },
  ];

  const handleScroll = (direction) => {
    const scrollAmount = isSmallerScreen ? 300 : 420;
    const newScrollLeft =
      scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    setScrollLeft(newScrollLeft);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  return (
    <Box
      p={4}
      className="container mx-auto mt-10 relative"
      overflow="hidden"
      position="relative"
    >
      <Heading as="h1" size="xl"  color="blue.400" className="text-center ">
        Top Destinations in India ✨
      </Heading>
      <Flex
        ref={scrollRef}
        overflowX="auto"
        overflowY="hidden"
        className="pb-4 mt-12"
        style={{ scrollbarWidth: "thin" }}
      >
        {destinations.map((dest, index) => (
          <Box
            key={dest.name}
            w={isSmallerScreen ? "240px" : "300px"}
            h={isSmallerScreen ? "320px" : "320px"}
            className="shadow-lg rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105 "
            mr={4}
            style={{ flexShrink: 0 }}
            borderBottom="10px solid rgb(240,85,55)"
            _hover={{
              borderBottomWidth: "100px",
              transition: "border-bottom-width 0.4s ease-in-out",
            }}
          >
            <Image
              src={dest.image}
              alt={dest.name}
              h="100%"
              objectFit="cover"
              className="w-full "
            />
            <Box
              p={4}
              bg="rgba(0,0,0,0.5)"
              color="white"
              h="100%"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="5xl" fontWeight="bold" >
                {dest.name}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>

      {/* Scattered blur effect */}
      <Box
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        width={80}
        bgGradient="radial(rgba(255, 255, 255, 0.7) 3%, rgba(255, 255, 255, 0) 80%)"
        zIndex={1}
      />

      {/* Navigation arrows */}
      <IconButton
        aria-label="Scroll Left"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left={4}
        transform="translateY(-50%)"
        onClick={() => handleScroll("left")}
        disabled={scrollLeft === 0}
        zIndex={2}
      />
      <IconButton
        aria-label="Scroll Right"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right={4}
        transform="translateY(-50%)"
        onClick={() => handleScroll("right")}
        disabled={
          scrollLeft >=
          (scrollRef.current?.scrollWidth || 0) -
            (scrollRef.current?.clientWidth || 0)
        }
        zIndex={2} 
      />
    </Box>
  );
};

export default TopDestinationsIndia;
