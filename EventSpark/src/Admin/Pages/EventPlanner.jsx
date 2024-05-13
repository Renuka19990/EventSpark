import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Flex,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import Sidebar from '../Components/Sidebar';
import { AdminNav } from '../Components/AdminNav';

const EventPlanner = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [sort, setSort] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: '', age: '', email: '', userID: ''
  });
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, minAge, maxAge, sort]);

  const fetchUsers = async () => {
    try {
      // const token = localStorage.getItem('token');


      const { data } = await axios.get(`http://localhost:8080/admin/users`, {
        params: { page, limit, search, minAge, maxAge, sort },
        headers: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       }
      });
  
     const usersData=data.users.filter(user=>user.role=="eventPlanner");
     console.log(usersData);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast({
        title: 'Error fetching users',
        description: error.response?.data?.error || 'Failed to fetch users',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };


 



//
  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${userID}`);
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

 





  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const UserModal = ({ isOpen, onClose, user }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? 'Edit User' : 'Add New User'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Username" defaultValue={user ? user.username : ''} mb={3} />
          <Input placeholder="Age" type="number" defaultValue={user ? user.age : ''} mb={3} />
          <Input placeholder="Email" defaultValue={user ? user.email : ''} mb={3} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
 


  return (
    <>
    <AdminNav/>
    <Box width="100%" p={4}>
      <FormControl mb={4} mt={4}>
        <FormLabel htmlFor='search'>Search User</FormLabel>
        <Input
          id='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
        />
        <Flex mt={4} justifyContent="center" alignItems="center">
          <Button mr={4} onClick={openAddModal}>Add User</Button>
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
            placeholder="Sort by Events"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
      </FormControl>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>EventPlanner</Th>
              <Th>Age</Th>
              <Th>Email</Th>
              <Th>Booked Events</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.userID}</Td>
                <Td>{user.username}</Td>
                <Td>{user.age}</Td>
                <Td>{user.email}</Td>
                <Td>{user.eventsBooked.length}</Td>
                <Td>
                  <Button colorScheme="blue" mr={3} onClick={() => openEditModal(user)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDeleteUser(user.userID)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan="6">
                <Flex justifyContent="space-between" alignItems="center">
                  <IconButton
                    icon={<FaRegArrowAltCircleLeft />}
                    onClick={() => setPage(Math.max(1, page - 1))}
                    isDisabled={page === 1}
                    aria-label="Previous Page"
                  />
                  <span>Page {page} of {totalPages}</span>
                  <IconButton
                    icon={<FaRegArrowAltCircleRight />}
                    onClick={() => setPage(page + 1)}
                    isDisabled={page === totalPages}
                    aria-label="Next Page"
                  />
                </Flex
              ></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <UserModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        user={currentUser}
      />
      <UserModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        user={null}
      />
    </Box>
    </>
  );
};

export default EventPlanner;
