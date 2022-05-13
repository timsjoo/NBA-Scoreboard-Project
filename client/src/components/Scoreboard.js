import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Scoreboard = (props) => {

  const {gameId} = props;

  const [gamesArray, setGamesArray] = useState([]);
  
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {id: `${gameId}`},
    headers: {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2'
    }
  };

  useEffect(() => {
    axios.request(options)
      .then((res) => {
        setGamesArray(res.data.response)
      })
      .catch((err)=> {
        console.log(err)
      });
  }, []);

  return(
    <Container>
      <Text>{console.log(gamesArray[0])}</Text>
    </Container>
  )
}

export default Scoreboard;