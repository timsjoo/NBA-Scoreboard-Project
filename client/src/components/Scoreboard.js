import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Flex,
  Box,
  Image,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const Scoreboard = (props) => {
  const { gameId } = props;

  const [gamesArray, setGamesArray] = useState([]);
  const [playersStats, setPlayerStats] = useState([]);
  const formattedTime = new Date(gamesArray[0]?.date.start);
  // console.log(formattedTime.toLocaleString())

  const optionsGames = {
    // FOR GAMES
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: { id: `${gameId}` },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2",
    },
  };

  useEffect(() => {
    // FOR GAMES
    axios
      .request(optionsGames)
      .then((res) => {
        setGamesArray(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionsPlayers = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
    params: { game: `${gameId}` },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2",
    },
  };

  useEffect(() => {
    axios
      .request(optionsPlayers)
      .then((res) => {
        setPlayerStats(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(gamesArray);
  // console.log(playersStats);

  return (
    <>
      {gamesArray.map((game) => {
        return (
          <Box
            backgroundColor="background.dark"
            backgroundSize="cover"
            pb="50px"
          >
            <Container
              pt="20px"
              mx="auto"
              maxW="1500px"
              minW="800px"
              key={game.id}
            >
              <Flex align={"center"} justifyContent={"space-evenly"}>
                <Flex
                  justifyContent={"space-between"}
                  align={"center"}
                  width="275px"
                >
                  <Flex flexDirection={"column"}>
                    <Text color="whiteAlpha.800" pb="10px">
                      {game.teams.home.name}
                    </Text>
                    <Image src={game.teams.home.logo} boxSize="200px" />
                  </Flex>
                  <Heading color="whiteAlpha.800">
                    {game.scores.home.points}
                  </Heading>
                </Flex>

                {game.status.short === 1 ? (
                  <Flex color="whiteAlpha.800">
                    {formattedTime.toLocaleString()}
                  </Flex>
                ) : (
                  <Flex>
                    <Flex flexDirection={"column"}>
                      <Text
                        borderRight="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.home.linescore[0]}
                      </Text>
                      <Text
                        borderRight="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.home.linescore[1]}
                      </Text>
                      <Text
                        borderRight="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.home.linescore[2]}
                      </Text>
                      <Text
                        borderRight="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.home.linescore[3]}
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection={"column"}
                      justifyContent="space-between"
                    >
                      <Flex flexDirection={"column"}>
                        <Text
                          mx="10px"
                          fontWeight="bold"
                          color="whiteAlpha.800"
                        >
                          Q1
                        </Text>
                        <Text
                          mx="10px"
                          fontWeight="bold"
                          color="whiteAlpha.800"
                        >
                          Q2
                        </Text>
                        <Text
                          mx="10px"
                          fontWeight="bold"
                          color="whiteAlpha.800"
                        >
                          Q3
                        </Text>
                        <Text
                          mx="10px"
                          fontWeight="bold"
                          color="whiteAlpha.800"
                        >
                          Q4
                        </Text>
                      </Flex>
                      {game.status.short === 3 ? (
                        <Text mt="20px" color="whiteAlpha.800">
                          Finished
                        </Text>
                      ) : game.status.short === 1 ? (
                        <Text mt="20px" color="whiteAlpha.800">
                          {formattedTime.toLocaleString()}
                        </Text>
                      ) : (
                        <Text mt="20px" color="whiteAlpha.800">
                          Live
                        </Text>
                      )}
                    </Flex>
                    <Flex flexDirection={"column"}>
                      <Text
                        borderLeft="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.visitors.linescore[0]}
                      </Text>
                      <Text
                        borderLeft="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.visitors.linescore[1]}
                      </Text>
                      <Text
                        borderLeft="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.visitors.linescore[2]}
                      </Text>
                      <Text
                        borderLeft="1px solid black"
                        px="10px"
                        color="whiteAlpha.800"
                      >
                        {game.scores.visitors.linescore[3]}
                      </Text>
                    </Flex>
                  </Flex>
                )}
                <Flex
                  justifyContent={"space-between"}
                  align={"center"}
                  width="275px"
                >
                  <Heading color="whiteAlpha.800">
                    {game.scores.visitors.points}
                  </Heading>
                  <Flex flexDirection={"column"}>
                    <Text color="whiteAlpha.800" pb="10px">
                      {game.teams.visitors.name}
                    </Text>
                    <Image src={game.teams.visitors.logo} boxSize="200px" />
                  </Flex>
                </Flex>
              </Flex>
              <Flex justifyContent={"center"} mt="10px">
                <Accordion width="753px" pt="30px" allowToggle>
                  <AccordionItem>
                    <AccordionButton color="whiteAlpha.800">
                      {game.teams.home.name}
                    </AccordionButton>
                    <AccordionPanel>
                      <TableContainer rounded="lg" bg="#294667">
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th color="whiteAlpha.800">Name</Th>
                              <Th color="whiteAlpha.800">Min</Th>
                              <Th color="whiteAlpha.800">PTS</Th>
                              <Th color="whiteAlpha.800">FG</Th>
                              <Th color="whiteAlpha.800">3PT</Th>
                              <Th color="whiteAlpha.800">REB</Th>
                              <Th color="whiteAlpha.800">AST</Th>
                              <Th color="whiteAlpha.800">BL</Th>
                              <Th color="whiteAlpha.800">STL</Th>
                              <Th color="whiteAlpha.800">TO</Th>
                              <Th color="whiteAlpha.800">FT</Th>
                              <Th color="whiteAlpha.800">+/-</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {playersStats
                              .sort((a, b) => b.points - a.points)
                              .map((player) => {
                                return player.team.id === game.teams.home.id &&
                                  player.min !== "0:00" &&
                                  player.min !== null ? (
                                  <Tr key={player.player.id}>
                                    <Td fontSize="12px" color="white">
                                      {player.player.firstname}{" "}
                                      {player.player.lastname}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.min}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.points}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.fgm}/{player.fga}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.tpm}/{player.tpa}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.totReb}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.assists}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.blocks}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.steals}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.turnovers}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.ftm}/{player.fta}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.plusMinus}
                                    </Td>
                                  </Tr>
                                ) : null;
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton color="whiteAlpha.800">
                      {game.teams.visitors.name}
                    </AccordionButton>
                    <AccordionPanel>
                      <TableContainer rounded="lg" bg="#294667">
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th color="whiteAlpha.800">Name</Th>
                              <Th color="whiteAlpha.800">Min</Th>
                              <Th color="whiteAlpha.800">PTS</Th>
                              <Th color="whiteAlpha.800">FG</Th>
                              <Th color="whiteAlpha.800">3PT</Th>
                              <Th color="whiteAlpha.800">REB</Th>
                              <Th color="whiteAlpha.800">AST</Th>
                              <Th color="whiteAlpha.800">BL</Th>
                              <Th color="whiteAlpha.800">STL</Th>
                              <Th color="whiteAlpha.800">TO</Th>
                              <Th color="whiteAlpha.800">FT</Th>
                              <Th color="whiteAlpha.800">+/-</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {playersStats
                              .sort((a, b) => b.points - a.points)
                              .map((player) => {
                                return player.team.id ===
                                  game.teams.visitors.id &&
                                  player.min !== "0:00" &&
                                  player.min !== null ? (
                                  <Tr key={player.player.id}>
                                    <Td fontSize="12px" color="white">
                                      {player.player.firstname}{" "}
                                      {player.player.lastname}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.min}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.points}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.fgm}/{player.fga}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.tpm}/{player.tpa}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.totReb}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.assists}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.blocks}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.steals}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.turnovers}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.ftm}/{player.fta}
                                    </Td>
                                    <Td fontSize="12px" color="white">
                                      {player.plusMinus}
                                    </Td>
                                  </Tr>
                                ) : null;
                              })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </Container>
          </Box>
        );
      })}
    </>
  );
};

export default Scoreboard;
