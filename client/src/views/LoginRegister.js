import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';
import { Flex, Box, HStack, Link, useColorModeValue, background} from '@chakra-ui/react';

const LoginRegister = (props) => {
  return(
    <Box
    w="100%"
    h="100%"
    backgroundColor='background.dark'
    backgroundSize="cover"
  >
    <Box bg='#152F4D' px={10}>
        <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
          </HStack>
          <Flex>
            <Link href="/home" style={{textDecoration: "none"}} mx="10px" color="whiteAlpha.800">Games Schedule</Link>
          </Flex>
        </Flex>
      </Box>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Login />
      <Register />
    </Flex>
    </Box>
  )
}

export default LoginRegister;