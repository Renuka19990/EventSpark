import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge, Box, Button, Flex, Grid, IconButton, Image, Input, Select, Text, useToast } from '@chakra-ui/react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

const API_URL = 'http://localhost:8080';

function App() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    city: '',
    search: '',
    sort: 'asc' // or 'desc'
  });

  const toast = useToast();

  useEffect(() => {
    fetchEvents();
  }, [page, filters]);

  const fetchEvents = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyMDIyNywiZXhwIjoxNzE1NTIzODI3fQ.9Ap1aJWH0AhJSu-vgkDrwBBD_Cbx_MRnq3-Qdfft_cE"; // Replace with your actual token
      const { data } = await axios.get(`${API_URL}/events`, {
        params: { page, ...filters },
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(data.events);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast({
        title: 'Error fetching events',
        description: error.response?.data?.error || 'Failed to fetch events',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyMDIyNywiZXhwIjoxNzE1NTIzODI3fQ.9Ap1aJWH0AhJSu-vgkDrwBBD_Cbx_MRnq3-Qdfft_cE"; // Repeat usage, ensure security practices
      await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(event => event.eventId !== eventId));
      toast({
        title: 'Event Deleted',
        description: 'The event was successfully deleted',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Failed to Delete Event',
        description: `Error: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
//
  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Events</Text>
      <Flex mb={4} gap={2} align="center">
        <Input placeholder="Min Price" name="minPrice" onChange={handleFilterChange} />
        <Input placeholder="Max Price" name="maxPrice" onChange={handleFilterChange} />
        <Input placeholder="City" name="city" onChange={handleFilterChange} />
        <Input placeholder="Search" name="search" onChange={handleFilterChange} />
        <Select name="sort" onChange={handleFilterChange} placeholder="Sort by">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </Flex>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {events.map(event => (
          <Box key={event.eventId} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" height="100%">
            <Image src={event.imageUrl} alt={`Image for ${event.title}`} height="200px" width="100%" objectFit="cover" />
            <Box p="4">
              <Badge borderRadius="full" px="2" colorScheme="teal" mr={2}>New</Badge>
              <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" color="gray.500" isTruncated>
                {event.category} &bull; {event.location}
              </Text>
              <Text mt={2} noOfLines={1} fontWeight="bold">{event.title}</Text>
              <Text fontSize="sm" mt={1} noOfLines={2}>{event.description}</Text>
              <Text fontWeight="semibold" mt={2}>${event.price} USD</Text>
              <Flex mt={2}>
                {event.ticketTypes.map(type => (
                  <Badge key={type} borderRadius="full" px="2" colorScheme="teal" mr={1}>{type}</Badge>
                ))}
              </Flex>
              <Button colorScheme="red" onClick={() => deleteEvent(event.eventId)} mt={3} size="sm">Delete</Button>
            </Box>
          </Box>
        ))}
      </Grid>
      <Flex justifyContent="space-between" alignItems="center" mt={6}>
        <IconButton
          icon={<FaRegArrowAltCircleLeft />}
          onClick={() => setPage(Math.max(1, page - 1))}
          isDisabled={page === 1}
          aria-label="Previous Page"
        />
        <Text>Page {page} of {totalPages}</Text>
        <IconButton
          icon={<FaRegArrowAltCircleRight />}
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages}
          aria-label="Next Page"
        />
      </Flex>
    </Box>
  );
}

export default App;
