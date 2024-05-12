import {
    Box,
    Heading,
    SimpleGrid,
    Image,
    Text,
    Badge,
    Flex,
    useMediaQuery,
    AspectRatio,
    Skeleton,
    SkeletonText,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { formatDistance } from "date-fns";
  import { useNavigate } from "react-router-dom";
  
  const TrendingEvents = () => {
    const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();
  
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch("http://localhost:8080/events");
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setEvents(data.events.slice(0, 9)); 
          setIsLoading(false); 
        } catch (error) {
          console.error("Error fetching events:", error);
          setIsLoading(false); 
        }
      };
  
      fetchEvents();
    }, []);
  
    return (
      <Box p={4} className="container mx-auto">
        <Heading as="h1" size="3xl" mb={8} color="gray.500" className="text-center mt-12">
          Trending Events 🎉
        </Heading>
  
        <SimpleGrid columns={[1, null, isSmallerScreen ? 2 : 3]} spacing={4} className="mt-16">
          {isLoading ? (
            // Display skeletons while loading
            Array.from({ length: 9 }).map((_, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" className="shadow-lg">
                <Skeleton height="200px" borderRadius="md" mb={4} />
                <SkeletonText noOfLines={4} spacing="4" />
              </Box>
            ))
          ) : (
            // Display event cards when data is loaded
            events.map((event) => (
              <Box
                key={event.eventId}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                className="shadow-lg cursor-pointer"
                onClick={() => navigate("/events")}
              >
                <AspectRatio ratio={16 / 9} mb={4} overflow="hidden">
                  <Image
                    src={event.imageUrl || "placeholder_image_url"}
                    alt={event.title}
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </AspectRatio>
                <Heading as="h3" size="md" mb={2}>
                  {event.title}
                </Heading>
                <Text fontSize="sm" mb={2} color="gray.600">
                  {formatDistance(new Date(event.eventDate), new Date(), {
                    addSuffix: true,
                  })}
                </Text>
                <Badge colorScheme="teal" mb={2}>
                  {event.category}
                </Badge>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold">Price: {event.Price==0?"Free":`$${event.Price}`}</Text>
                  <Text>{event.location}</Text>
                </Flex>
              </Box>
            ))
          )}
        </SimpleGrid>
      </Box>
    );
  };
  
  export default TrendingEvents;
  