import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Flex, Box, Image, Heading , TableContainer,Table, Thead, Tbody,Tr, Th, Td, Accordion, AccordionButton, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const Scoreboard = (props) => {
  const { gameId } = props;

  const [gamesArray, setGamesArray] = useState([]);
  const [playersStats, setPlayerStats] = useState([]);

  const optionsGames = { // FOR GAMES
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: { id: `${gameId}` },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2",
    },
  };

  useEffect(() => { // FOR GAMES
    axios
      .request(optionsGames)
      .then((res) => {
        setGamesArray(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionsPlayers =  {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/players/statistics",
    params: {game: `${gameId}`},
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
      .catch((err)=> {
        console.log(err);
      })
  }, [])

  console.log(gamesArray);
  console.log(playersStats);

  return (
    <>
      {gamesArray.map((game) => {
        return (
          <Container mt="20px" mx="auto" maxW="1500px" minW="800px" key="game.id">
            <Flex align={"center"} justifyContent={"space-evenly"}>
              <Flex
                justifyContent={"space-between"}
                align={"center"}
                width="275px"
              >
                <Image src={game.teams.home.logo} boxSize="200px" />
                <Heading>{game.scores.home.points}</Heading>
              </Flex>
              <Flex>
                <Flex flexDirection={"column"}>
                  <Text borderRight="1px solid black" px="10px">{game.scores.home.linescore[0]}</Text>
                  <Text borderRight="1px solid black" px="10px">{game.scores.home.linescore[1]}</Text>
                  <Text borderRight="1px solid black" px="10px">{game.scores.home.linescore[2]}</Text>
                  <Text borderRight="1px solid black" px="10px">{game.scores.home.linescore[3]}</Text>
                </Flex>
                <Flex flexDirection={"column"} justifyContent='space-between'>
                  <Flex flexDirection={"column"}>
                  <Text mx="10px" fontWeight='bold'>Q1</Text>
                  <Text mx="10px" fontWeight='bold'>Q2</Text>
                  <Text mx="10px" fontWeight='bold'>Q3</Text>
                  <Text mx="10px" fontWeight='bold'>Q4</Text>
                  </Flex>
                  {
                    game.status.short === 3 ? <Text mt="20px">Finished</Text> : null
                  }
                </Flex>
                <Flex flexDirection={"column"}>
                  <Text borderLeft="1px solid black" px="10px">{game.scores.visitors.linescore[0]}</Text>
                  <Text borderLeft="1px solid black" px="10px">{game.scores.visitors.linescore[1]}</Text>
                  <Text borderLeft="1px solid black" px="10px">{game.scores.visitors.linescore[2]}</Text>
                  <Text borderLeft="1px solid black" px="10px">{game.scores.visitors.linescore[3]}</Text>
                </Flex>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                align={"center"}
                width="275px"
              >
                <Heading>{game.scores.visitors.points}</Heading>
                <Image src={game.teams.visitors.logo} boxSize="200px" />
              </Flex>
            </Flex>
            <Flex 
              justifyContent={'center'}
              mt="10px"
            >
              <Accordion width="753px" allowToggle>
                <AccordionItem>
                  <AccordionButton>{game.teams.home.name}</AccordionButton>
                  <AccordionPanel>
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Min</Th>
                          <Th>PTS</Th>
                          <Th>FG</Th>
                          <Th>3PT</Th>
                          <Th>REB</Th>
                          <Th>AST</Th>
                          <Th>BL</Th>
                          <Th>STL</Th>
                          <Th>TO</Th>
                          <Th>FT</Th>
                          <Th>+/-</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          playersStats.map(player => {
                            return player.team.id === game.teams.home.id && player.min !== "0:00" && player.min !== null ?
                              <Tr>
                                <Td fontSize="10px">{player.player.firstname} {player.player.lastname}</Td>
                                <Td fontSize="10px">{player.min}</Td>
                                <Td fontSize="10px">{player.points}</Td>
                                <Td fontSize="10px">{player.fgm}/{player.fga}</Td>
                                <Td fontSize="10px">{player.tpm}/{player.tpa}</Td>
                                <Td fontSize="10px">{player.totReb}</Td>
                                <Td fontSize="10px">{player.assists}</Td>
                                <Td fontSize="10px">{player.blocks}</Td>
                                <Td fontSize="10px">{player.steals}</Td>
                                <Td fontSize="10px">{player.turnovers}</Td>
                                <Td fontSize="10px">{player.ftm}/{player.fta}</Td>
                                <Td fontSize="10px">{player.plusMinus}</Td>
                              </Tr> : null
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
                <AccordionItem>
                <AccordionButton>{game.teams.visitors.name}</AccordionButton>
                <AccordionPanel>
                <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Min</Th>
                          <Th>PTS</Th>
                          <Th>FG</Th>
                          <Th>3PT</Th>
                          <Th>REB</Th>
                          <Th>AST</Th>
                          <Th>BL</Th>
                          <Th>STL</Th>
                          <Th>TO</Th>
                          <Th>FT</Th>
                          <Th>+/-</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        { 
                          
                          playersStats.sort((a,b)=> b.points - a.points).map(player => {
                            return player.team.id === game.teams.visitors.id && player.min !== "0:00" ?
                              <Tr>
                                <Td fontSize="10px">{player.player.firstname} {player.player.lastname}</Td>
                                <Td fontSize="10px">{player.min}</Td>
                                <Td fontSize="10px">{player.points}</Td>
                                <Td fontSize="10px">{player.fgm}/{player.fga}</Td>
                                <Td fontSize="10px">{player.tpm}/{player.tpa}</Td>
                                <Td fontSize="10px">{player.totReb}</Td>
                                <Td fontSize="10px">{player.assists}</Td>
                                <Td fontSize="10px">{player.blocks}</Td>
                                <Td fontSize="10px">{player.steals}</Td>
                                <Td fontSize="10px">{player.turnovers}</Td>
                                <Td fontSize="10px">{player.ftm}/{player.fta}</Td>
                                <Td fontSize="10px">{player.plusMinus}</Td>
                              </Tr> : null
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Container>
        );
      })}
    </>
  );
};

export default Scoreboard;
