import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/users/login",
      {
        username: username,
        password: password
      },
      {
        withCredentials: true
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      
        <Box
          rounded='lg'
          boxShadow='lg'
          p='8'
          mr="40px"
          bg="#ddedf4"
        >
          <Stack spacing={4}>
            <Stack align={'center'}>
            <Heading fontSize={'3xl'}>Login</Heading>
          </Stack>
          {errors ? errors : ""}
          <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} bg="#c9e9f7"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="#c9e9f7"/>
            </FormControl>
            <Stack>
              <Button
                type="submit"
                bg='blue.400'
                color='white'
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      
    </form>
  );
}

export default Login;