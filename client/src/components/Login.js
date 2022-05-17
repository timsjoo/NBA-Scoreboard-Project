import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box rounded="lg" boxShadow="lg" p="8" mr="60px" bg="#294667" maxW="300">
        <Stack spacing={4}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} color="whiteAlpha.800">
              Login
            </Heading>
          </Stack>
          <Text color="whiteAlpha.800">{errors ? errors : ""}</Text>
          <FormControl id="username">
            <FormLabel color="whiteAlpha.800">Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="white"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
            />
          </FormControl>
          <Stack>
            <Button
              type="submit"
              bg="blue.500"
              color="white"
              _hover={{
                bg: "blue.600",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
