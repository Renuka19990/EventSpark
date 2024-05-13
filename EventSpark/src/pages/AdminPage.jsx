import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../Admin/Components/Sidebar';  // Check this path to ensure it's correct
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Admin/Pages/Dashboard';
import EventPlanner from '../Admin/Pages/EventPlanner';
import UserList from '../Admin/Pages/User';
import EventsAdmin from '../Admin/Pages/Events';
import { AdminNav } from '../Admin/Components/AdminNav';

const AdminPage = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <AdminNav/>
      {/* <Sidebar >
      <Dashboard/>
     
         
      </Sidebar> */}
    </Box>
  );
};

export default AdminPage;
