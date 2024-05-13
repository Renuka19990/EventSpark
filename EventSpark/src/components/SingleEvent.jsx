import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';

export default function SingleEvent() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8080/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvent(response.data.item); // Adjust according to actual API response
        setLoading(false);
      } catch (err) {
        setError(`Failed to load event: ${err.message || err}`);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;
  if (!event) return <Box>No event found</Box>;

  return (
    <Container maxW={'7xl'} py={{ base: 5, md: 10 }} >
      <SimpleGrid columnGap={50}
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}>
          
        <Flex>
          <Image
            rounded={'md'}
            alt={`Image of ${event.title}`}
            src={event.imageUrl}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={0.9}
              fontWeight={300}
              fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
              mb={4} // More space between the heading and text
            >
              {event.title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'xl'} // Adjusted for better space management
              mb={6} // Additional margin for better separation
              mt={5}
              ml={5}
            >
              {event.location} - ${event.Price}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
          >
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize={'lg'}
              fontWeight={'300'}
              mb={4} // Ensure space between text sections
            >
              {event.description}
            </Text>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Event Details
              </Text>
              <List spacing={2}>
                <ListItem>Date: {new Date(event.eventDate).toLocaleDateString()}</ListItem>
                <ListItem>Time: {event.time}</ListItem>
                <ListItem>Mode: {event.mode}</ListItem>
                <ListItem>Category: {event.category}</ListItem>
              </List>
            </Box>
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
            >
              Book Event
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
