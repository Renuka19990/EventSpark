/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Import Link and Routes
import {
  Box,
  Flex,
  Button,
  Spacer,
  IconButton,
  Stack,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import logo from '../images/logo.png';
import { useAuth } from '../Context/ThemeContext';

export function AdminNav() {
  const { isOpen, onToggle } = useDisclosure();
  const{handleLogout}=useAuth();

  return (
    <Box p={4} shadow="md">
      <Flex align="center" justify="space-between">
        {/* Logo/Branding */}
        <Link to="/">
        <Box fontSize="xl" fontWeight="bold">
          <img style={{ maxHeight: "60px" }} src={logo} alt="" />
        </Box>
        </Link>

        {/* Desktop Navigation */}
        <Flex display={{ base: "none", md: "flex" }}>
          <Stack direction="row" spacing={4}>
            <Link to="/admin/dashboard">
              <Button
                variant="ghost"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/eventPlanner">
              <Button
                variant="ghost"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              >
                Event Planner
              </Button>
            </Link>
            <Link to="/admin/eventsdetail">
              <Button
                variant="ghost"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              >
                Events
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button
                variant="ghost"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              >
                Users
              </Button>
            </Link>
            <Link to="/admin/logout">
              <Button
                variant="ghost"
                _hover={{ bg: "gray.100", color: "blue.500" }}
              >
                Logout
              </Button>
            </Link>
          </Stack>
        </Flex>

        {/* Mobile Navigation Toggle */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        />
      </Flex>

      {/* Collapsible Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <Stack
          mt={2}
          pl={4}
          color="white" 
          borderLeft={1}
          borderStyle="solid"
        //   borderColor="gray.200"
          align="start"
        >
          <Link to="/dashboard">
            <Button
              variant="solid"
              w="full"
              color="white" 
              onClick={onToggle}
              _hover={{ bg: "gray.100", color: "blue.500" }}
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/eventPlanner">
            <Button
              variant="ghost"
              w="full"
              onClick={onToggle}
              _hover={{ bg: "gray.100", color: "blue.500" }}
            >
              Event Planner
            </Button>
          </Link>
          <Link to="/eventsdetail">
            <Button
              variant="ghost"
              w="full"
              onClick={onToggle}
              _hover={{ bg: "gray.100", color: "blue.500" }}
            >
              Events
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button
              variant="ghost"
              w="full"
              onClick={onToggle}
              _hover={{ bg: "gray.100", color: "blue.500" }}
            >
              Users
            </Button>
          </Link>
          <Link to="/logout">
            <Button
              variant="ghost"
              w="full"
              onClick={handleLogout}
              _hover={{ bg: "gray.100", color: "blue.500" }}
            >
              Logout
            </Button>
          </Link>
        </Stack>
      </Collapse>
    </Box>
  );
}

