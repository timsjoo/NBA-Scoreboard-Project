import React, { useState, useEffect } from "react";
import axios from "axios";

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
  Text,
} from "@chakra-ui/react";

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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmReg("Registration successful! You may now log in.");
        setErrors({});
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        rounded="lg"
        boxShadow="lg"
        p="8"
        ml="60px"
        bg="#294667"
        maxW="300px"
        minW="250px"
      >
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize={"3xl"} color="whiteAlpha.800">
              Register
            </Heading>
          </Stack>
          {confirmReg ? (
            <Text fontSize="md" color="whiteAlpha.800">
              {confirmReg}
            </Text>
          ) : null}
          <FormControl id="username">
            <FormLabel color="whiteAlpha.800">Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={(e) => handleChange(e)}
              bg="white"
            />
            {errors.username ? (
              <Text color="whiteAlpha.800">{errors.username.message} </Text>
            ) : null}
          </FormControl>
          <FormControl id="email">
            <FormLabel color="whiteAlpha.800">Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              bg="white"
            />
            {errors.email ? (
              <Text color="whiteAlpha.800">{errors.email.message} </Text>
            ) : null}
          </FormControl>
          <FormControl id="favoriteTeam">
            <FormLabel color="whiteAlpha.800">Favorite Team</FormLabel>
            <Select
              name="favoriteTeam"
              value={user.favoriteTeam}
              onChange={handleChange}
              placeholder="Select a favorite team"
              bg="white"
            >
              <option value={1}>Atlanta Hawks</option>
              <option value={2}>Boston Celtics</option>
              <option value={4}>Brooklyn Nets</option>
              <option value={5}>Charlotte Hornets</option>
              <option value={6}>Chicago Bulls</option>
              <option value={7}>Cleveland Cavaliers</option>
              <option value={8}>Dallas Mavericks</option>
              <option value={9}>Denver Nuggets</option>
              <option value={10}>Detroit Pistons</option>
              <option value={11}>Golden State Warriors</option>
              <option value={14}>Houston Rockets</option>
              <option value={15}>Indiana Pacers</option>
              <option value={16}>LA Clippers</option>
              <option value={17}>LA Lakers</option>
              <option value={19}>Memphis Grizzlies</option>
              <option value={20}>Miami Heat</option>
              <option value={21}>Milwaukee Bucks</option>
              <option value={22}>Minnesota Timberwolves</option>
              <option value={23}>New Orleans Pelicans</option>
              <option value={24}>New York Knicks</option>
              <option value={25}>Oklahoma City Thunder</option>
              <option value={26}>Orlando Magic</option>
              <option value={27}>Philadelphia 76ers</option>
              <option value={28}>Phoenix Suns</option>
              <option value={29}>Portland Trail Blazers</option>
              <option value={30}>Sacramento Kings</option>
              <option value={31}>San Antonio Spurs</option>
              <option value={38}>Toronto Raptors</option>
              <option value={40}>Utah Jazz</option>
              <option value={41}>Washington Wizards</option>
            </Select>
            {errors.favoriteTeam ? (
              <Text color="whiteAlpha.800">{errors.favoriteTeam.message} </Text>
            ) : null}
          </FormControl>
          <FormControl id="password">
            <FormLabel color="whiteAlpha.800">Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              bg="white"
            />
            {errors.password ? (
              <Text color="whiteAlpha.800">{errors.password.message} </Text>
            ) : null}
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel color="whiteAlpha.800">Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              bg="white"
            />
            {errors.confirmPassword ? (
              <Text color="whiteAlpha.800">
                {errors.confirmPassword.message}{" "}
              </Text>
            ) : null}
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
              Register
            </Button>
          </Stack>
        </Stack>
      </Box>
    </form>
  );
};

export default Register;
