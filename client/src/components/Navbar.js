import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';




const Navbar = () => {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`,
      { withCredentials: true }
      )
      .then((res)=> {
       // console.log(res.data);
        setUser(res.data);
      })
      .catch((err)=>console.log(err))
  }, [])

  const logout = (e) => {
    axios.post("http://localhost:8000/api/users/logout", {}, {withCredentials: true})
      .then((res) => {
        navigate("/login")
      })
      .catch((err)=> {
        console.log(err);
      })
  }

  return (
    <>
      <Box bg={'#152F4D'} px={10}>
        <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Text color="whiteAlpha.800">{user.username ? `Welcome ${user.username}` : null}</Text>
          </HStack>
          <Flex>
            <Link href="/home" style={{textDecoration: "none"}} mx="10px" color="whiteAlpha.800">Games</Link>
            { user._id ? <Link style={{textDecoration: "none"}} onClick={logout} mx="10px" color="whiteAlpha.800">Logout</Link> : <Link href="/login" mx="10px" color="whiteAlpha.800">Login</Link>}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;