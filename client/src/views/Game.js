import React from 'react';
import Scoreboard from '../components/Scoreboard';
import { useParams } from 'react-router-dom';



const Game = (props) => {
  const gameId = useParams();

  return(
    <div>
      <Scoreboard gameId={gameId.gameId} />
    </div>
  )
}

export default Game;