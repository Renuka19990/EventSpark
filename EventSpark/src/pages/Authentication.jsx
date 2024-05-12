import  { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <Tabs variant='soft-rounded' colorScheme='green' isFitted index={showForgotPassword ? 2 : (isLogin ? 0 : 1)}> 
          <TabList mb="4">
            <Tab onClick={() => setIsLogin(true)}>Login</Tab>
            <Tab onClick={() => setIsLogin(false)}>Sign Up</Tab>
            {/* Conditionally render the "Forgot Password" tab */}
            {showForgotPassword && <Tab>Forgot Password</Tab>} 
          </TabList>

          <TabPanels>
            <TabPanel> 
              {/* Login Form */}
              <form>
                {/* ... (email and password input fields) ... */}
                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                  <a href="#" onClick={handleForgotPasswordClick} className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800">Forgot Password?</a>
                </div>
              </form>
            </TabPanel>

            <TabPanel> 
              {/* Signup Form */}
              {/* ... (signup form fields) ... */}
            </TabPanel>

            {/* Forgot Password Tab */}
            <TabPanel>
              <form>
                <div className="mb-4">
                  <label htmlFor="forgotPasswordEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                  <input type="email" id="forgotPasswordEmail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset Password</button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Authentication;
