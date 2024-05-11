import {
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer, FiUsers, FiUserX } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Dashboard() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'left'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
      Dashboard
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Users'}
          stat={'5,000'}
          icon={<BsPerson size={'3em'} />}
        />
        <StatsCard
          title={'Events'}
          stat={'1,000'}
          icon={<FiServer size={'3em'} />}
        />
        <StatsCard
          title={'EventPlanner'}
          stat={'7'}
          icon={<FiUsers size={'3em'} />}
        />
      </SimpleGrid>
      <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>UserID</Th>
            <Th>EventID</Th>
            <Th>Event Planner</Th>
            <Th>Category</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>101</Td>
            <Td>John Doe</Td>
            <Td>Conference</Td>
            <Td><Button colorScheme='blue'>Edit</Button></Td>
            <Td><Button colorScheme='red'>Delete</Button></Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>102</Td>
            <Td>Jane Smith</Td>
            <Td>Seminar</Td>
            <Td><Button colorScheme='blue'>Edit</Button></Td>
            <Td><Button colorScheme='red'>Delete</Button></Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>103</Td>
            <Td>Emily Johnson</Td>
            <Td>Workshop</Td>
            <Td><Button colorScheme='blue'>Edit</Button></Td>
            <Td><Button colorScheme='red'>Delete</Button></Td>
          </Tr>
        </Tbody>
       
      </Table>
    </TableContainer>

    {/* <Box>
      <Heading as="h2" size="lg" mb={4}>
        Expenses
      </Heading>
      {expenses.length > 0 ? (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.title}</Td>
                <Td>{expense.description}</Td>
                <Td>${expense.amount}</Td>
                <Td>{expense.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box> */}
    </Box>
  );
}
