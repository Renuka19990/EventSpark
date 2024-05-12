import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../Admin/Components/Sidebar';  // Check this path to ensure it's correct
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Sidebar>
        
          <Outlet /> 
       
      </Sidebar>
    </Box>
  );
};

export default AdminPage;
