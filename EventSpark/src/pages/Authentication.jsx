import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Img,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { useAuth } from "../Admin/Context/ThemeContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const loggingCredentials={
    email:"",
    password:"",
}

const emptyUserObject = {
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    profilePicture: ""
  };
  

export const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isResetPasswordStep, setIsResetPasswordStep] = useState(false);
  const {login, logout,handleSignUp,handleLogin,LoggedIn,setLoggedIn } =useAuth();
  const [loggingData,setLoggingData]=useState(loggingCredentials);
  const [registerData,setRegisterDataData]=useState(emptyUserObject);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastShow = handleLogin(loggingData);
    toast.promise(toastShow, {
      success: {
        title: "Login Successful",
        description: `Hi ${loggingData.email} Welcome Back`,
      },
      error: { title: "Login Failed", description: "Wrong Credential" },
      loading: { title: "Promise pending", description: "Please wait" },
    });

    if(LoggedIn.isAdmin==="admin"){
      navigate("/admin")
    }else{
        navigate("/")
    }
  };


  const handleChange = (e) => {
    setLoggingData({ ...loggingData, [e.target.name]: e.target.value });
  };

  const handleRegistration=(e)=>{
       e.preventDefault();
        handleSignUp(registerData);
        setFormData(init);
        navigate("/login");
  }

  const handleRegistrationChange = (e) => {
    setRegisterDataData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = () => {
    setIsForgetPassword(true);
    setIsLoginForm(false);
    setIsRegisterForm(false);
  };

  const handleRegister = () => {
    setIsRegisterForm(true);
    setIsLoginForm(false);
    setIsForgetPassword(false);
  };

  const handleBackToLogin = () => {
    setIsLoginForm(true);
    setIsForgetPassword(false);
    setIsRegisterForm(false);
  };

  const handleSendResetLink = () => {
    // Logic to send reset link and trigger OTP step
    setIsOtpStep(true);
  };

  const handleVerifyOTP = () => {
    // Logic to verify OTP and trigger password reset step
    setIsResetPasswordStep(true);
  };

  const handleResetPassword = () => {
    // Logic to reset password
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        w={{ base: "50%", md: "80%", lg: "60%" }}
        h={{ base: "auto", md: "70%", lg: "70%" }}
        border="1px solid #ccc"
        borderRadius="md"
        boxShadow="md"
      >
        <Box
          flex="1"
          h={{ base: "50%", md: "100%" }}
          borderRight={{ base: "none", md: "1px solid #ccc" }}
          borderBottom={{ base: "1px solid #ccc", md: "none" }}
        >
          <Img
            src="https://cdn.taggbox.com/v7/taggbox.com/blog/wp-content/uploads/2021/03/stage-virtual.jpg?w=1000"
            alt="Image"
            height="100%"
            objectFit="cover"
          />
        </Box>
        <Box
          flex="1"
          p={5}
          pt={2}
          h={{ base: "50%", md: "100%" }}
          alignItems="center"
          justifyContent="center"
          borderLeft={{ base: "none", md: "1px solid #ccc" }}
          borderTop={{ base: "1px solid #ccc", md: "none" }}
          marginTop={{ base: "16px", md: "0" }}
        >
          <Img src={logo} alt="Logo" mb={4} />

          {isLoginForm && !isForgetPassword && !isRegisterForm && (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl id="email" mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="text" name="email" required placeholder="Enter your Email" w="100%" value={loggingData.email}  onChange={handleChange}/>
              </FormControl>

              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={loggingData.password} onChange={handleChange} required placeholder="Enter your password" />
              </FormControl>

              <Button type="submit" colorScheme="blue" mb={4} w="100%">
                Sign in
              </Button>

              <Flex justify="space-between">
                <Link onClick={handleForgotPassword}>Forgot Password?</Link>
                <Link onClick={handleRegister}>Register</Link>
              </Flex>
            </form>
          )}

          {isForgetPassword && !isOtpStep && (
            <form>
              <FormControl id="email" mb={4}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" style={{ maxWidth: "100%" }}  />
              </FormControl>

              <Button type="submit" colorScheme="blue" mb={4}>
                Send Reset Link
              </Button>

              {isOtpStep && !isResetPasswordStep && (
                <>
                  <FormControl id="otp" mb={4}>
                    <FormLabel>Enter OTP</FormLabel>
                    <Input type="text" style={{ maxWidth: "100%" }}  />
                  </FormControl>

                  <Button onClick={handleVerifyOTP} colorScheme="blue" mb={4}>
                    Verify OTP
                  </Button>
                </>
              )}

              {isResetPasswordStep && (
                <>
                  <FormControl id="password" mb={4}>
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" style={{ maxWidth: "100%" }} />
                  </FormControl>

                  <FormControl id="confirmPassword" mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" style={{ maxWidth: "100%" }} />
                  </FormControl>

                  <Button type="submit" colorScheme="blue" mb={4}>
                    Reset Password
                  </Button>
                </>
              )}
              <Link onClick={handleBackToLogin}>Back to Login</Link>
            </form>
          )}

          {isRegisterForm && (
            <form onSubmit={handleRegistration}>
              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <FormControl id="username" mb={4} mr={{ md: 4 }}>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" name="username" value={registerData.username}  required placeholder="Enter your Username" onChange={handleRegistrationChange} />
                </FormControl>

                <FormControl id="email" mb={4}>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email"value={registerData.email}  required placeholder="Enter your Email" onChange={handleRegistrationChange} />
                </FormControl>
              </Flex>

              <Flex
                direction={{ base: "column", md: "row" }}
                alignItems="center"
              >
                <FormControl id="password" mb={4} mr={{ md: 4 }}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" value={registerData.password} required placeholder="Enter your password"  onChange={handleRegistrationChange} />
                </FormControl>

                <FormControl id="dateOfBirth" mb={4}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" name="dateOfBirth" value={registerData.dateOfBirth}  required placeholder="Enter your Date Of Birth" onChange={handleRegistrationChange}  />
                </FormControl>
              </Flex>

              <FormControl id="profilePicture" mb={4}>
                <FormLabel>Profile Picture</FormLabel>
                <Input type="text" name="profilePicture" value={registerData.profilePicture}  required placeholder="Add Your Profile Image" onChange={handleRegistrationChange} />
              </FormControl>

              <Button type="submit" colorScheme="blue" mb={4} w="100%">
                Register
              </Button>

              <Link onClick={handleBackToLogin}>Back to Login</Link>
            </form>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
