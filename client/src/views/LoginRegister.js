import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { Flex } from '@chakra-ui/react';

const LoginRegister = (props) => {
  return(
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Login />
      <Register />
    </Flex>
  )
}

export default LoginRegister;