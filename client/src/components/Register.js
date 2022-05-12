import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';

const Register = (props) => {

  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/users/register",
      user,
      {
        withCredentials: true
      })
      .then((res) => {
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        setConfirmReg("Registration successful!");
        setErrors({});
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      })
  }


  return (
    <form onSubmit={handleSubmit}>
      
        <Box
          rounded='lg'
          boxShadow='lg'
          p='8'
          ml="40px"
        >
          <Stack spacing={4}>
            <Stack align='center'>
              <Heading fontSize={'3xl'}>Register</Heading>
            </Stack>
            {confirmReg ? <h4>{confirmReg}</h4> : null}
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" value={user.username} onChange={(e)=> handleChange(e)}/>
              { errors.username ? (<span>{errors.username.message} </span>) : null }
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={user.email}onChange={handleChange}/>
              { errors.email ? (<span>{errors.email.message} </span>) : null }
            </FormControl>
            <FormControl id="favoriteTeam">
              <FormLabel>Favorite Team</FormLabel>
                <Select placeholder='Select option'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"name="password" value={user.password} onChange={handleChange}/>
              { errors.password ? (<span>{errors.password.message} </span>) : null }
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange}/>
              { errors.confirmPassword ? (<span>{errors.confirmPassword.message} </span>) : null }
            </FormControl>
            <Stack>
              <Button
                type="submit"
                bg='blue.400'
                color='white'
                _hover={{
                  bg: 'blue.500',
                }}>
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      
    </form>
  );
}

export default Register;