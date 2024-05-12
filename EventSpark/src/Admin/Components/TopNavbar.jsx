import React from 'react';
import { Flex, Button, useColorModeValue, Image, Input } from '@chakra-ui/react';
import { useAuth } from '../Context/ThemeContext';
import logo from '../images/dark_bg.png'
import Sidebar from './Sidebar';
 // Make sure to import the useAuth hook

const TopNavBar = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <>   
  
     <Flex
    px="4"
    py="2"
    bg={useColorModeValue('black', 'gray.800')}
    alignItems="center"
    justifyContent="space-between"
    borderBottomWidth="1px"
    borderColor={useColorModeValue('black', 'gray.700')}
    color={useColorModeValue('white', 'gray.200')}
    position={"sticky"}
    top={0}
    zIndex={10}
  >
   <Image style={{ height: "80px" }} src={logo}/>
  <Flex gap={5 } justifyContent={"flex-end"}>
  <Input
      type="search"
      placeholder="Search..."
      // value={searchTerm}
      // onChange={handleInputChange}
      // onKeyPress={handleKeyPress}
    />
  <Button>Search</Button>
  {isLoggedIn ? (
      <Button onClick={logout}>Logout</Button>
    ) : (
      <Button onClick={login}>Login</Button>
    )}
  </Flex>
  
 
  </Flex> </>
 
  );
};

export default TopNavBar;
