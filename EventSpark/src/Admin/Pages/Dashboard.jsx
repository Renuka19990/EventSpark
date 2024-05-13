import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Th,
  Tr,
  useToast,
  Image,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer, FiUsers } from 'react-icons/fi';

const API_URL = 'http://localhost:8080';

function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'gray.300'}
      rounded={'lg'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} color={'gray.500'} alignContent={'center'}>
          {icon}
        </Box>
      </Box>
    </Stat>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const toast = useToast();
//
  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      }),
      axios.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
    ]).then(([usersResponse, eventsResponse]) => {
      setUsers(usersResponse.data.users);
      setEvents(eventsResponse.data.events);
    }).catch((error) => {
      toast({
        title: 'Error fetching data',
        description: error.message || 'Failed to fetch data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  }, []);

  const mergeData = () => {
    return events.map(event => {
      const user = users.find(user => user.eventsBooked.includes(event.eventId));
      return {
        ...event,
        userProfile: user ? user.profilePicture : 'default_image_url',
        userName: user ? user.username : 'N/A'
      };
    });
  }

  const mergedData = mergeData();

  return (
    <Box maxW="7xl" mx="auto" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign="left" fontSize="4xl" py={10} fontWeight="bold">
        Dashboard
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title="Total Users" stat={users.length} icon={<BsPerson size="1em" />} />
        <StatsCard title="Total Events" stat={events.length} icon={<FiServer size="1em" />} />
        <StatsCard 
  title="Active Event Planners" 
  stat={users.filter(user => user.role === 'eventPlanner').length} 
  icon={<FiUsers size="1em" />} 
/>

      </SimpleGrid>

      <TableContainer mt={6}>
        <Table variant="simple" colorScheme="blue">
          <TableCaption>Integrated Details of Users and Events</TableCaption>
          <Thead>
            <Tr>
              <Th>Event Title</Th>
              <Th>Username</Th>
              <Th>Profile Picture</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mergedData.map((item) => (
              <Tr key={item.eventId}>
                <Td>{item.title}</Td>
                <Td>{item.userName}</Td>
                <Td>
                  <Image
                    src={item.userProfile}
                    alt={`Profile of ${item.userName}`}
                    borderRadius="full"
                    boxSize="50px"
                    objectFit="cover"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard;
