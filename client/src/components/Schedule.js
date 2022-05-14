import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import ScheduleCard from './ScheduleCard';
import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import DatePicker from 'react-date-picker';

const Schedule = (props) => {

  const [gamesArray, setGamesArray] = useState([]);
  const [value, setValue] = useState(new Date());


  const gameDate = value.toLocaleDateString('af-ZA');

  const gameDayBeforeString = value.toLocaleString();
  const gameDayBefore = new Date(gameDayBeforeString)

  console.log(value)
  

  const optionsFirst = useMemo(() => ({
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {date: gameDate},
    headers: {
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2'
    }
  }), [gameDate] 
  )


  useEffect(() => {
    
    axios.request(optionsFirst)
      .then((res) => {
        setGamesArray(res.data.response)
      })
      .catch((err)=> {
        console.log(err)
      });
  }, [optionsFirst]);

  // const optionsSecond = useMemo(() => ({
  //   method: 'GET',
  //   url: 'https://api-nba-v1.p.rapidapi.com/games',
  //   params: {date: gameDate},
  //   headers: {
  //     'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  //     'X-RapidAPI-Key': '0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2'
  //   }
  // }), [gameDate] 
  // )

  
  console.log(gamesArray)
  return(
    <>
      <Container
        mt="50px"
        minWidth="1000px"
        maxWidth="1500px"
      >
        <Heading mb="20px">Games</Heading>
        <DatePicker onChange={setValue} value={value}/>
        <SimpleGrid 
          columns={3} 
          spacing={5}
          mt="30px"
          py="20px" 
          px="20px"
          rounded='md' 
          bg='#ddedf4'
          minChildWidth="380px"
        >
          {gamesArray.map((gameObject) => {
          return <ScheduleCard key={gameObject.id} gameObject={gameObject} />
        })}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Schedule;