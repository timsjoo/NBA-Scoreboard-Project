import React from 'react';
import Scoreboard from '../components/Scoreboard';
import Comments from '../components/Comments';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';




const Game = (props) => {
  const gameId = useParams();

  return(
    <Box bg={'#071C34'} h="100vh">
      <Navbar />
      <Scoreboard gameId={gameId.gameId} />
      <Comments currentUserId="1" currentGameId={gameId.gameId} />
    </Box>
  )
}

export default Game;