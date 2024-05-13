// import { useState } from 'react';
// import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

// const Authentication = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);

//   const handleForgotPasswordClick = () => {
//     setShowForgotPassword(true);
//   };

//   const handleLoginFormSubmit = (event) => {
//     event.preventDefault();
//     // Implement login functionality here
//   };

//   const handleSignUpFormSubmit = (event) => {
//     event.preventDefault();
//     // Implement signup functionality here
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md flex flex-col md:flex-row w-full md:w-96">
//         {/* Left side image of event */}
//         <div className="md:w-1/2 flex justify-center items-center">
//           <img src="/path/to/your/image.jpg" alt="Event" className="w-full h-auto" />
//         </div>
//         {/* Right side forms */}
//         <div className="md:w-1/2 md:pl-8">
//           <Tabs variant='soft-rounded' colorScheme='blue' isFitted index={showForgotPassword ? 2 : (isLogin ? 0 : 1)}> 
//             <TabList mb="4">
//               <Tab onClick={() => setIsLogin(true)}>Login</Tab>
//               <Tab onClick={() => setIsLogin(false)}>Sign Up</Tab>
//               {/* Conditionally render the "Forgot Password" tab */}
//               {showForgotPassword && <Tab>Forgot Password</Tab>} 
//             </TabList>
  
//             <TabPanels>
//               <TabPanel> 
//                 {/* Login Form */}
//                 <form onSubmit={handleLoginFormSubmit}>
//                   {/* Your login form content */}
//                 </form>
//               </TabPanel>
  
//               <TabPanel> 
//                 {/* Signup Form */}
//                 <form onSubmit={handleSignUpFormSubmit}>
//                   {/* Your signup form content */}
//                 </form>
//               </TabPanel>
  
//               {/* Forgot Password Tab */}
//               <TabPanel>
//                 <form>
//                   {/* Your forgot password form content */}
//                 </form>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Authentication;


// import React, { useState } from "react";
// import { Box, Flex, Image, FormControl, FormLabel, Input, Button, Link, Img } from "@chakra-ui/react";

// const Authentication = () => {
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [isForgetPassword, setIsForgetPassword] = useState(false);
//   const [isRegisterForm, setIsRegisterForm] = useState(false);

//   const handleLogin = () => {
//     // Handle login logic
//   };

//   const handleForgotPassword = () => {
//     setIsForgetPassword(true);
//     setIsLoginForm(false);
//     setIsRegisterForm(false);
//   };

//   const handleRegister = () => {
//     setIsRegisterForm(true);
//     setIsLoginForm(false);
//     setIsForgetPassword(false);
//   };

//   const handleBackToLogin = () => {
//     setIsLoginForm(true);
//     setIsForgetPassword(false);
//     setIsRegisterForm(false);
//   };

//   return (
//     <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
//       <Flex bg="red" w="50%" h="60%">
//         <Box flex="1" >
//           <Img src="https://tse1.mm.bing.net/th?id=OIP.AN_7GG2XJDBAwtSyLLxhEAHaEK&pid=Api&P=0&h=180" alt="Image" width="100%" height="auto" />
//         </Box>

//         <Box flex="1" p={8}>
//           {isLoginForm && !isForgetPassword && !isRegisterForm && (
//             <form onSubmit={handleLogin}>
//               <FormControl id="email" mb={4}>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" />
//               </FormControl>

//               <FormControl id="password" mb={4}>
//                 <FormLabel>Password</FormLabel>
//                 <Input type="password" />
//               </FormControl>

//               <Button type="submit" colorScheme="blue" mb={4}>
//                 Sign in
//               </Button>

//               <Flex justify="space-between">
//                 <Link onClick={handleForgotPassword}>Forgot Password?</Link>
//                 <Link onClick={handleRegister}>Register</Link>
//               </Flex>
//             </form>
//           )}

//           {isForgetPassword && (
//             <form>
//               <FormControl id="email" mb={4}>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" />
//               </FormControl>

//               <Button type="submit" colorScheme="blue" mb={4}>
//                 Send Reset Link
//               </Button>

//               <Link onClick={handleBackToLogin}>Back to Login</Link>
//             </form>
//           )}

//           {isRegisterForm && (
//             <form>
//               <FormControl id="name" mb={4}>
//                 <FormLabel>Name</FormLabel>
//                 <Input type="text" />
//               </FormControl>

//               <FormControl id="email" mb={4}>
//                 <FormLabel>Email address</FormLabel>
//                 <Input type="email" />
//               </FormControl>

//               <FormControl id="password" mb={4}>
//                 <FormLabel>Password</FormLabel>
//                 <Input type="password" />
//               </FormControl>

//               <Button type="submit" colorScheme="blue" mb={4}>
//                 Register
//               </Button>

//               <Link onClick={handleBackToLogin}>Back to Login</Link>
//             </form>
//           )}
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default Authentication;
