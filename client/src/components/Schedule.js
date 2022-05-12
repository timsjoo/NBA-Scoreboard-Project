import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ScheduleCard from './ScheduleCard';
import { SimpleGrid, Container, Heading } from '@chakra-ui/react';

const Schedule = (props) => {

  const [gamesArray, setGamesArray] = useState([]);
  
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {date: '2022-02-10'},
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

  console.log(gamesArray)

  return(
    <Container
      minWidth="1000px"
      maxWidth="1500px"
    >
      <Heading>Games</Heading>
      <SimpleGrid 
        columns={3} 
        spacing={5}
        py='20' 
        rounded='md' 
        bg='#ddedf4'
        minChildWidth="380px"
      >
        {gamesArray.map((gameObject) => <ScheduleCard key={gameObject.id} gameObject={gameObject} />)}
      </SimpleGrid>
    </Container>
  )
}

export default Schedule;