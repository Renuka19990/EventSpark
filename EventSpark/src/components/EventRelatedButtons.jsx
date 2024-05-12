import {
    Box,
    Button,
    Flex,
    Text,
    useMediaQuery,
    Center,
  } from "@chakra-ui/react";
  import {
    MdHeadphones,
    MdComputer,
    MdBuild,
    MdSportsVolleyball,
    MdRestaurantMenu,
    MdPalette,
    MdStore,
    MdStyle,
  } from "react-icons/md";
  import { useNavigate } from "react-router-dom"; 
  
  const EventRelatedButtons = () => {
    const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();
  
    const events = [
      { name: "Music", icon: MdHeadphones },
      { name: "Tech", icon: MdComputer },
      { name: "Workshop", icon: MdBuild },
      { name: "Sports", icon: MdSportsVolleyball },
      { name: "Food", icon: MdRestaurantMenu },
      { name: "Art", icon: MdPalette },
      { name: "Expo", icon: MdStore },
      { name: "Fashion", icon: MdStyle },
    ];
  
    return (
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        gap={isSmallerScreen ? 3 : 24}
        mt={20}
      >
        {events.map((event) => (
          <Box
            key={event.name}
            textAlign="center"
            width={isSmallerScreen ? "80px" : "120px"}
            _hover={{ color: "rgb(37 99 235)" }}
          >
            <Button
              size={isSmallerScreen ? "lg" : "2xl"}
              borderRadius="50%"
              variant="outline"
              justifyContent="center"
              padding={isSmallerScreen ? 15 : 10}
              _hover={{
                bg: "rgb(239 246 255)",
                color: "rgb(37 99 235)",
                transform: "scale(1.15)",
              }}
              onClick={() => navigate("/events")} 
            >
              <Center>
                <event.icon size={isSmallerScreen ? 25 : 50} />
              </Center>
            </Button>
            <Text mt={2} fontSize={isSmallerScreen ? "sm" : "lg"}>
              {event.name}
            </Text>
          </Box>
        ))}
      </Flex>
    );
  };
  
  export default EventRelatedButtons;
  