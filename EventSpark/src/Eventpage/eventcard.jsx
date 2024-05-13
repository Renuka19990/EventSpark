/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Center,
  Heading,
  Container,
  IconButton,
  Text,
  Button,
  Input,
  Stack,
  AspectRatio,
  Flex,
  Grid,
  useColorModeValue,
  Select,
  Img,
} from "@chakra-ui/react";
import { useState,useEffect } from 'react';
import { FaHeart } from "react-icons/fa";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => clearTimeout(timeoutId);
    }, [value, delay]); 
    
    return debouncedValue;
  }

export function EventsCard({event}) {
    const [isSaved, setIsSaved] = useState(false);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: "short", month: "short", day: "2-digit" };
        return date.toLocaleDateString("en-US", options);
    };
    const handleSaveToggle = () => {
        setIsSaved(!isSaved);
    };
    
    return (
            <Box 
                maxW={"290px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={2}
                overflow={"hidden"}
                borderRadius={"lg"}
                transition={"transform 0.3s ease"}
                _hover={{ transform: "scale(1.05)", borderRadius: "lg" }}
                cursor={"pointer"}
                position="relative"
            >
                <Box
                    pos="relative"
                    bg={"gray.100"}
                    mt={-2}
                    mx={-2}
                    borderTopRadius={"md"}
                    borderBottomRadius={0}
                    overflow={"hidden"}
                >
                    <AspectRatio ratio={4 / 3}>
                        <Img src={event.imageUrl} alt="Example" objectFit="cover" />
                    </AspectRatio>
                    <IconButton
                         aria-label={isSaved ? "Unlike" : "Like"}
                         icon={<FaHeart />}
                         onClick={handleSaveToggle}
                         color={isSaved ? "red" : "white"}
                         bg={isSaved ? "white" : "red"}
                         variant="unstyled"
                         position="absolute"
                         top={1}
                         fontSize="xl"
                         padding={2} 
                         right={1}
                         zIndex={1}                    
                    />
                </Box>
                <Stack>
                    <Text color={"gray.800"} fontWeight={"500"}>
                        {event.title}
                    </Text>
                </Stack>
                <Stack mt={2} direction={"row"} spacing={4} align={"center"}>
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text color={"gray.500"}>{formatDate(event.eventDate)} {event.time}</Text>
                        {
                            event.Price === 0 ? <Text fontWeight={600}>Free</Text> : <Text fontWeight={600}>Price: ₹ {event.Price}</Text>
                        }
                    </Stack>
                </Stack>
            </Box>
        );
}


const categoryEnum = [
    "All",
  "Music",
  "Tech",
  "Workshop",
  "Sports",
  "Food",
  "Art",
  "Expo",
  "Fashion",
  "Education",
  "Health",
  "Business",
  "Science",
  "Travel",
];

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const handlePrevPage = () => {
        if (currentPage>1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage<totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <Flex justifyContent="space-between" alignItems="center" w={"100%"}>
        <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            className="pagination-button"
            color="black"
            variant="unstyled" 
            fontSize="xl" 
        >
            <HiOutlineArrowCircleLeft />
        </Button>
        <Text className="pagination-info">
            Page {currentPage} of {totalPages}
        </Text>
        <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            className="pagination-button"
            fontSize="xl" 
            color="black"
            variant="unstyled" 
        >
            <HiOutlineArrowCircleRight  />
        </Button>
    </Flex>
    );
};
const EmptyMessage = () => {
    return (
      <Box textAlign="center" mt={8}>
        <Flex justifyContent={"center"} height={"200px"}>
      <Img src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png" alt="Nothing" />
      </Flex>
        <Text fontSize="lg" color="gray.600" fontWeight="bold">
          Oops! There is nothing to show.
        </Text>
        <Box mt={4} bg="gray.100" p={4} borderRadius="md" display="inline-block">
          <Text fontSize="sm" color="gray.600">
            Looks like there are no Active Events for this Category to display at the moment.
          </Text>
        </Box>
      </Box>
    );
  };
  

export const EventsNav = () => {
    const [activeCategory, setActiveCategory] = useState(categoryEnum[0]);
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(400);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);

    useEffect(() => {
        fetchEvents();
    }, [currentPage, debouncedSearchQuery, sortOrder, activeCategory, minPrice, maxPrice]);

    const API_URL = "https://eventspark-ldbp.onrender.com/events";

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}?page=${currentPage}&search=${searchQuery}&sort=${sortOrder}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            const data = await response.json();
            if (activeCategory !== "All") {
                const filteredEvents = data.events.filter(event => event.category === activeCategory);
              //  setTotalPages(Math.ceil(filteredEvents.length/20));
                // if(filteredEvents.length==0){
                //     // setTotalPages(1);
                // }else{
                //     setTotalPages(data.totalPages);
                // }
                const pages=filteredEvents.length<=20?1:Math.ceil(filteredEvents.length/20);
                console.log(filteredEvents.length)
                console.log(pages)
                setTotalPages(pages);
                setEvents(filteredEvents);
            } else {
                setEvents(data.events);
                setTotalPages(data.totalPages);
            }
            //setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); 
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(1); 
    };

    return (
        <Container maxW={"7xl"}>
            <Flex flexDirection={"column"} rowGap={5}>
            <Flex justifyContent="space-between" alignItems="center" display={{ base: 'none', lg: 'flex' }} >
                    <Input
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
>
                        <option value="asc">Oldest First</option>
                        <option value="desc">Newest First</option>
                    </Select>
                    <Select
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    >
                        <option value={0}>Min Price</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={200}>$200</option>
                    </Select>
                    <Select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    >
                        <option value={400}>Max Price</option>
                        <option value={100}>₹100</option>
                        <option value={200}>₹200</option>
                        <option value={300}>₹300</option>
                        <option value={400}>₹400</option>
                    </Select>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center" display={{ base: 'block', lg: 'none' }} >
                    <Input
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
>
                        <option value="asc">Oldest First</option>
                        <option value="desc">Newest First</option>
                    </Select>
                    <Select
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    >
                        <option value={0}>Min Price</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        <option value={200}>$200</option>
                    </Select>
                    <Select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    >
                        <option value={400}>Max Price</option>
                        <option value={100}>₹100</option>
                        <option value={200}>₹200</option>
                        <option value={300}>₹300</option>
                        <option value={400}>₹400</option>
                    </Select>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    {/* Category Select */}
                    {/* For larger screens */}
                    <Flex
                        bg={useColorModeValue("white", "gray.800")}
                        p={4}
                        pl={0}
                        columnGap={6}
                        justifyContent="center"
                        alignItems="center"
                        display={{ base: 'none', lg: 'flex' }}
                    >
                        {categoryEnum.map((category, index) => (
                            <Text
                                key={index}
                                fontWeight={activeCategory === category ? 'bold' : 'normal'}
                                color={activeCategory === category ? 'blue.500' : 'inherit'}
                                cursor="pointer"
                                mr={4}
                                fontSize={"18px"}
                                _hover={{
                                    textDecoration: 'underline',
                                    color: 'blue.500',
                                }}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Text>
                        ))}
                    </Flex>

                    {/* for Smaller Screen Size */}
                    <Select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        display={{ base: 'block', lg: 'none' }}
                        variant="filled"
                        bg={useColorModeValue("white", "gray.800")}
                        color={useColorModeValue("gray.800", "white")}
                        w={"90vw"}
                    >
                        {categoryEnum.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Select>
                </Flex>
                {events.length>0?<Grid rowGap={6} columnGap={5}  templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}>
                    {events.map((event, index) => (
                        <EventsCard key={index} event={event} />
                    ))}
                </Grid>:<EmptyMessage/>}
                <Flex justifyContent="space-between" mt={5}>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                </Flex>
            </Flex>
        </Container>
    );
};


// export const EventsNav = () => {
//     const [activeCategory, setActiveCategory] = useState(categoryEnum[0]);
//     const [events, setEvents] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [sortOrder, setSortOrder] = useState("asc");
//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(400);
//     const debouncedSearchQuery = useDebounce(searchQuery, 1000);

//     useEffect(() => {
//         fetchEvents();
//     }, [currentPage, debouncedSearchQuery, sortOrder, activeCategory, minPrice, maxPrice]);

//     const API_URL = "http://localhost:8080/events";

//     const fetchEvents = async () => {
//         try {
//             const response = await fetch(`${API_URL}?page=${currentPage}&search=${searchQuery}&sort=${sortOrder}&maxPrice=${maxPrice}&minPrice=${minPrice}`);
//             const data = await response.json();
//             if (activeCategory !== "All") {
//                 const filteredEvents = data.events.filter(event => event.category === activeCategory);
//                 setEvents(filteredEvents);
//             } else {
//                 setEvents(data.events);
//             }
//             setTotalPages(data.totalPages);
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setCurrentPage(newPage);
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setCurrentPage(1); // Reset to first page when searching
//     };

//     const handleSortChange = (e) => {
//         setSortOrder(e.target.value);
//         setCurrentPage(1);
//     };

//     return (
//         <Container maxW={"7xl"}>
//             <Flex flexDirection={"column"} rowGap={5}>
//                 <Flex justifyContent="space-between" alignItems="center">
//                     <Input
//                         placeholder="Search events..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                     />
//                     <Select
//                         value={sortOrder}
//                         onChange={handleSortChange}
// >
//                         <option value="asc">Oldest First</option>
//                         <option value="desc">Newest First</option>
//                     </Select>

//                     <Select
//                         value={activeCategory}
//                         onChange={(e) => setActiveCategory(e.target.value)}
//                         variant="filled"
//                         bg={useColorModeValue("white", "gray.800")}
//                         color={useColorModeValue("gray.800", "white")}
//                     >
//                         {categoryEnum.map((category, index) => (
//                             <option key={index} value={category}>{category}</option>
//                         ))}
//                     </Select>
//                     <Select
//                         value={minPrice}
//                         onChange={(e) => setMinPrice(e.target.value)}
//                     >
//                         <option value={0}>Min Price</option>
//                         <option value={50}>$50</option>
//                         <option value={100}>$100</option>
//                         <option value={200}>$200</option>
//                     </Select>
//                     <Select
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                     >
//                         <option value={400}>Max Price</option>
//                         <option value={100}>$100</option>
//                         <option value={200}>$200</option>
//                         <option value={300}>$300</option>
//                         <option value={400}>$400</option>
//                     </Select>
//                 </Flex>
//                 <Grid rowGap={5} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}>
//                     {events.map((event, index) => (
//                         <EventsCard key={index} event={event} />
//                     ))}
//                 </Grid>
//                 <Flex justifyContent="space-between" mt={5}>
//                     <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
//                 </Flex>
//             </Flex>
//         </Container>
//     );
// };
