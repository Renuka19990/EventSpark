import  { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    // Implement login functionality here
  };

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();
    // Implement signup functionality here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <Tabs variant='soft-rounded' colorScheme='blue' isFitted index={showForgotPassword ? 2 : (isLogin ? 0 : 1)}> 
          <TabList mb="4">
            <Tab onClick={() => setIsLogin(true)}>Login</Tab>
            <Tab onClick={() => setIsLogin(false)}>Sign Up</Tab>
            {/* Conditionally render the "Forgot Password" tab */}
            {showForgotPassword && <Tab>Forgot Password</Tab>} 
          </TabList>

          <TabPanels>
            <TabPanel> 
              {/* Login Form */}
              <form onSubmit={handleLoginFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input type="email" id="loginEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                  <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input type="password" id="loginPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                  <a href="#" onClick={handleForgotPasswordClick} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
                </div>
              </form>
            </TabPanel>

            <TabPanel> 
              {/* Signup Form */}
              <form onSubmit={handleSignUpFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="signupUsername" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                  <input type="text" id="signupUsername" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input type="email" id="signupEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupPassword" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                  <input type="password" id="signupPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupDateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                  <input type="date" id="signupDateOfBirth" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                  <label htmlFor="signupProfilePicture" className="block text-gray-700 text-sm font-bold mb-2">Profile Picture:</label>
                  <input type="text" id="signupProfilePicture" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
              </form>
            </TabPanel>

            {/* Forgot Password Tab */}
            <TabPanel>
              <form>
                <div className="mb-4">
                  <label htmlFor="forgotPasswordEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input type="email" id="forgotPasswordEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset Password</button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Authentication;
