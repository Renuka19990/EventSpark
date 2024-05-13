// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Button, FormControl, FormLabel, Input, Table,
//   Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
//   Select, Flex, IconButton, useToast, Modal,
//   ModalOverlay, ModalContent, ModalHeader, ModalFooter,
//   ModalBody, ModalCloseButton, Text
// } from '@chakra-ui/react';
// import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

// const UserModal = ({ isOpen, onClose, user, onChange, onSave }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent>
//       <ModalHeader>{user?.email ? 'Edit User' : 'Add New User'}</ModalHeader>
//       <ModalCloseButton />
//       <ModalBody>
//         <FormControl isRequired>
//           <FormLabel>Username</FormLabel>
//           <Input name="username" placeholder="Username" value={user.username || ''} onChange={onChange} mb={3} />
//           <FormLabel>Email</FormLabel>
//           <Input name="email" placeholder="Email" value={user.email || ''} onChange={onChange} mb={3} />
//           <FormLabel>Password</FormLabel>
//           <Input name="password" placeholder="Password" type="password" value={user.password || ''} onChange={onChange} mb={3} />
//           <FormLabel>Date of Birth</FormLabel>
//           <Input name="dateOfBirth" type="date" value={user.dateOfBirth || ''} onChange={onChange} mb={3} />
//           <FormLabel>Role</FormLabel>
//           <Select name="role" value={user.role || ''} onChange={onChange}>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </Select>
//         </FormControl>
//       </ModalBody>
//       <ModalFooter>
//         <Button colorScheme="blue" onClick={onSave}>Save</Button>
//         <Button variant="ghost" onClick={onClose}>Cancel</Button>
//       </ModalFooter>
//     </ModalContent>
//   </Modal>
//   );
// };

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [search, setSearch] = useState('');
  // const [minAge, setMinAge] = useState('');
  // const [maxAge, setMaxAge] = useState('');
  // const [sort, setSort] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState({ username: '', age: '', email: '', userID: '' });
//   const toast = useToast();

//   useEffect(() => {
//     fetchUsers();
//   }, [page, limit, search, minAge, maxAge, sort]);

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:8080/admin/users`, {
//         params: { page, limit, search, minAge, maxAge, sort },
//         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyNTUyMiwiZXhwIjoxNzE1NTI5MTIyfQ.1ySV6Ndcm8z8AXmiQThuwIBXN0CNC_cfrydThxHCId4` }
//       });
//       setUsers(data.users);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       toast({
//         title: 'Error fetching users',
//         description: error.response?.data?.error || 'Failed to fetch users',
//         status: 'error',
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

  // const handleDeleteUser = async (userID) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/admin/users/${userID}`, {
  //       headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyNTUyMiwiZXhwIjoxNzE1NTI5MTIyfQ.1ySV6Ndcm8z8AXmiQThuwIBXN0CNC_cfrydThxHCId4` }
  //     });
  //     setUsers(users.filter(user => user.userID !== userID));
  //     toast({
  //       title: 'User Deleted',
  //       description: 'The user has been successfully deleted.',
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: 'Error Deleting User',
  //       description: error.response?.data?.error || 'Failed to delete user',
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentUser(prev => ({ ...prev, [name]: value }));
//   };

//   // const handleSaveUser = async () => {
//   //   const method = currentUser.userID ? 'patch' : 'post';
//   //   const url = currentUser.userID ? `http://localhost:8080/admin/users/${currentUser.userID}` : `http://localhost:8080/admin/users`;
//   //   try {
//   //     await axios[method](url, currentUser, {
//   //       headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyNTUyMiwiZXhwIjoxNzE1NTI5MTIyfQ.1ySV6Ndcm8z8AXmiQThuwIBXN0CNC_cfrydThxHCId4` }
//   //     });
//   //     const message = currentUser.userID ? 'User updated successfully.' : 'User added successfully.';
//   //     fetchUsers();  // Refetch users to reflect changes
//   //     toast({
//   //       title: message,
//   //       status: 'success',
//   //       duration: 5000,
//   //       isClosable: true,
//   //     });
//   //     closeModal();
//   //   } catch (error) {
//   //     toast({
//   //       title: 'Error saving user',
//   //       description: error.response?.data?.error || 'Failed to save user details',
//   //       status: 'error',
//   //       duration: 9000,
//   //       isClosable: true,
//   //     });
//   //   }
//   // };

// //
//   //adding and updating users
//   const handleSaveUser = async () => {
//     const url = currentUser.email ? `http://localhost:8080/admin/users/${currentUser.email}` : `http://localhost:8080/admin/users`;
//     const method = currentUser.email ? 'patch' : 'post';
//     try {
//       await axios[method](url, currentUser, {
//         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmppdkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJ1c2VySUQiOjM3LCJ1c2VybmFtZSI6IlJhbmppdiIsImlhdCI6MTcxNTUyNTUyMiwiZXhwIjoxNzE1NTI5MTIyfQ.1ySV6Ndcm8z8AXmiQThuwIBXN0CNC_cfrydThxHCId4` }
//       });
//       const message = currentUser.email ? 'User updated successfully.' : 'User added successfully.';
//       fetchUsers();  // Refetch users to reflect changes
//       toast({
//         title: message,
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//       closeModal();
//     } catch (error) {
//       toast({
//         title: 'Error saving user',
//         description: error.response?.data?.error || 'Failed to save user details',
//         status: 'error',
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   const openModal = (user = { username: '', email: '', password: '', dateOfBirth: '', role: 'user' }) => {
//     setCurrentUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };


//   return (
//     <Box width="100%" p={4}>
//       <FormControl mb={4}>
//         <FormLabel htmlFor='search'>Search User</FormLabel>
//         <Input
//           id='search'
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by name or email"/>
//         <Flex mt={4} justifyContent="center" alignItems="center">
//           <Button mr={4} onClick={() => openModal()}>Add User</Button>
//           <Input
//             type="number"
//             value={minAge}
//             onChange={(e) => setMinAge(e.target.value)}
//             placeholder="Min Age"
//             mr={2}
//           />
//           <Input
//             type="number"
//             value={maxAge}
//             onChange={(e) => setMaxAge(e.target.value)}
//             placeholder="Max Age"
//             mr={2}
//           />
//           <Select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             placeholder="Sort by"
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </Select>
//         </Flex>
//       </FormControl>
//       <TableContainer>
//         <Table variant="striped" size="sm">
//           <Thead>
//             <Tr>
//               <Th>UserID</Th>
//               <Th>Username</Th>
//               <Th>Age</Th>
//               <Th>Email</Th>
//               <Th>Booked Events</Th>
//               <Th>Actions</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//   {users.map((user) => (
//     <Tr key={user.userID}>
//       <Td>{user.userID}</Td>
//       <Td>{user.username}</Td>
//       <Td>{user.age}</Td>
//       <Td>{user.email}</Td>
//       <Td>{user.eventsBooked.length}</Td>
//       <Td>
//         <Button colorScheme="blue" mr={3} onClick={() => openModal(user)}>Edit</Button>
//         <Button colorScheme="red" onClick={() => handleDeleteUser(user.userID)}>Delete</Button>
//       </Td>
//     </Tr>
//   ))}
// </Tbody>

//           <Tfoot>
//             <Tr>
//               <Th colSpan="6">
//                 <Flex justifyContent="space-between" alignItems="center">
//                   <IconButton
//                     icon={<FaRegArrowAltCircleLeft />}
//                     onClick={() => setPage(prev => Math.max(1, prev - 1))}
//                     isDisabled={page === 1}
//                     aria-label="Previous Page"
//                     size="lg"
//                   />
//                   <Text fontSize="lg">Page {page} of {totalPages}</Text>
//                   <IconButton
//                     icon={<FaRegArrowAltCircleRight />}
//                     onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
//                     isDisabled={page === totalPages}
//                     aria-label="Next Page"
//                     size="lg"
//                   />
//                 </Flex>
//               </Th>
//             </Tr>
//           </Tfoot>
//         </Table>
//       </TableContainer>
//       <UserModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         user={currentUser}
//         onChange={handleChange}
//         onSave={handleSaveUser}
//       />
//     </Box>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, FormControl, FormLabel, Input, Table,
  Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
  Select, Flex, IconButton, useToast, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Text
} from '@chakra-ui/react';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { AdminNav } from '../Components/AdminNav';

const formatDateForInput = (dateString) => {
  return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
};

const UserModal = ({ isOpen, onClose, user, onChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{user?.userID ? 'Edit User' : 'Add New User'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input name="username" placeholder="Username" value={user.username || ''} onChange={onChange} mb={3} />
          <FormLabel>Email</FormLabel>
          <Input name="email" placeholder="Email" value={user.email || ''} onChange={onChange} mb={3} />
          { !user.userID && (
            <>
              <FormLabel>Password</FormLabel>
              <Input name="password" placeholder="Password" type="password" onChange={onChange} mb={3} />
            </>
          )}
          <FormLabel>Date of Birth</FormLabel>
          <Input name="dateOfBirth" type="date" value={formatDateForInput(user.dateOfBirth)} onChange={onChange} mb={3} />
          <FormLabel>Role</FormLabel>
          <Select name="role" value={user.role || ''} onChange={onChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={onSave}>Save</Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [sort, setSort] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', password: '', dateOfBirth: '', role: 'user' });
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, minAge, maxAge, sort]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`https://eventspark-ldbp.onrender.com/admin/users`, {
        params: { page, limit, search,minAge, maxAge, sort },
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast({
        title: 'Error fetching users',
        description: 'Failed to fetch users',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`https://eventspark-ldbp.onrender.com/admin/users/${userID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setUsers(users.filter(user => user.userID !== userID));
      toast({
        title: 'User Deleted',
        description: 'The user has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Deleting User',
        description: error.response?.data?.error || 'Failed to delete user',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    const method = currentUser.userID ? 'patch' : 'post';
    const url = currentUser.userID ? `https://eventspark-ldbp.onrender.com/admin/users/${currentUser.userID}` : `http://localhost:8080/admin/users`;
    try {
      await axios[method](url, currentUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      
      fetchUsers();  // Refetch users to reflect changes
      toast({
        title: 'User added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      toast({
        title: 'Error saving user',
        description: 'Failed to save user details',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const openModal = (user = { username: '', email: '', password: '', dateOfBirth: '', role: 'user' }) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <AdminNav/>
    <Box width="100%" p={4}>
      
      <FormControl mb={4}>
        <FormLabel htmlFor='search'>Search User</FormLabel>
        <Input
          id='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"/>
          <Flex>
        <Button mr={4} onClick={() => openModal()}>Add User</Button>
        <Input
            type="number"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            placeholder="Min Age"
            mr={2}
          />
          <Input
            type="number"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            placeholder="Max Age"
            mr={2}
          />
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            placeholder="Sort by"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
      </FormControl>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>Username</Th>
              
              <Th>Email</Th>
              <Th>Booked Events</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.userID}>
                <Td>{user.userID}</Td>
                <Td>{user.username}</Td>
                <Td>{user.age}</Td>
                <Td>{user.email}</Td>
                <Td>{user.eventsBooked.length}</Td>
                <Td>
                  <Button colorScheme="blue" mr={3} onClick={() => openModal(user)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDeleteUser(user.userID)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan="4">
                <Flex justifyContent={"space-between"} >
                  <IconButton
                    icon={<FaRegArrowAltCircleLeft />}
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    isDisabled={page === 1}
                    aria-label="Previous Page"
                    size="lg"
                  />
                  <Text fontSize="lg">Page {page} of {totalPages}</Text>
                  <IconButton
                    icon={<FaRegArrowAltCircleRight />}
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    isDisabled={page === totalPages}
                    aria-label="Next Page"
                    size="lg"
                  />
                </Flex>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={currentUser}
        onChange={handleChange}
        onSave={handleSaveUser}
      />
    </Box>
    </>
  );
};

export default UserList;
