import { Stack, Text, Box, Avatar, useColorModeValue, Heading, Grid } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '23/05/23'
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
    review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '05/05/23'
  },
  {
    id: 3,
    name: 'Hellen Killer',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '21/05/23'
  },
  {
    id: 4,
    name: 'Maxie Jake',
    image: 'https://images.unsplash.com/photo-1622020920816-cd528763211a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJlYXJkZWQlMjBtYW58ZW58MHx8MHx8fDA%3D',
    review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '01/05/23'
  }
];

const CustomerReview = () => {
  const { colorMode } = useColorMode();
  // eslint-disable-next-line no-unused-vars
  const textColor = useColorModeValue('gray.400', 'gray.400');

  return (
    <Stack
      bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
      <Heading as="h1" size="3xl" mb={8} color="gray.500">
        Customer Reviews 
      </Heading>
      <Box maxW="1200px" w="100%" mx="auto">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={6} 
          w="100%"
          justifyContent="center"
        >
          {reviews.map(review => (
            <Box
              key={review.id}
              maxW="3xl"
              className="card"
              boxShadow="md"
              p={4}
              borderRadius="lg"
            >
              <Box className="card-image">
                <Avatar
                  src={review.image}
                  alt={review.name}
                  mb={2}
                />
              </Box>
              <Text className="card-title">{review.name}</Text>
              <Text className="card-body" fontSize={{ base: 'lg', md: 'xl' }}>
                {review.review}
              </Text>
              <Box className="footer">
                Written by <span className="by-name">{review.name}</span> on <span className="date">{review.date}</span>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default CustomerReview;
