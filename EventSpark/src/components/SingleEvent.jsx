
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Image,
  Stack,
  Tag,
  Button
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // to fetch URL parameters

export default function SingleEvent() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { eventId } = useParams(); // Assuming you are using react-router and the route is /events/:eventId




  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8080/events/${eventId}`, {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUzODI2OSwiZXhwIjoxNzE1NTQxODY5fQ.tx0GH6N_drM9K8ZltHX8TvRAShs2DYqJCX-HAIjWSXM` }
        });
        setEvent(response.data.item); // Adjust according to actual API response
        setLoading(false);
      } catch (err) {
        setError('Failed to load event');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box p={5} shadow="md" borderWidth="1px">
   
      <Heading fontSize="xl">{event.title}</Heading>
      <Image src={event.imageUrl} alt={`Image of ${event.title}`} />
      <Text mt={4}>{event.description}</Text>
      <Stack direction="row" spacing={4} align="center" mt={4}>
        <Tag>{event.category}</Tag>
        <Tag>{event.location}</Tag>
        <Text>Date: {new Date(event.eventDate).toLocaleDateString()}</Text>
        <Text>Time: {event.time}</Text>
        <Text>Mode: {event.mode}</Text>
        <Text>Price: ${event.Price}</Text>
      </Stack>
      <Button colorScheme="blue" mt={4}>Book Event</Button>
    </Box>
  );
}
