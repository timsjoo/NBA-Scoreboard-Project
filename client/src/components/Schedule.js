import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import ScheduleCard from './ScheduleCard';
import { SimpleGrid, Container, Heading } from '@chakra-ui/react';
import DatePicker from 'react-date-picker';

const Schedule = (props) => {

  const [gamesArray, setGamesArray] = useState([]);
  // const [dayAfterGamesArray, setDayAfterGamesArray] = useState([]);
  const [value, setValue] = useState(new Date());


  const gameDate = value.toLocaleDateString('af-ZA');
  
  // const gameDateObject = new Date(gameDate)
  // const optionsSecondDatePlusOne = new Date()
  // optionsSecondDatePlusOne.setDate(gameDateObject.getDate() + 2)
  // const optionsSecondDatePlusOneString = optionsSecondDatePlusOne.toLocaleDateString('af-ZA')

  // const fixedDayAfterGamesArray = dayAfterGamesArray.map((game) => {
  //   const gameTime = new Date(game.date.start)
  //   console.log(gameTime.toLocaleDateString('af-ZA') === gameDate)
  // }) 
   // console.log(optionsSecondDate)

 // console.log(value)
 // console.log(optionsSecondDatePlusOneString)

  // const gameTimeString = gamesArray[0].date.start
  // const gameTime = new Date(gameTimeString.split('T')[0])
  // const localGameTimeString = gameTime.toLocaleDateString('af-ZA')
  // console.log(localGameTimeString === "2022-05-13")

  // console.log(gameTimeString)
  // console.log(gameTime)
  // console.log(localGameTimeString)

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

  // const optionsSecond = useMemo(() => ({
  //   method: 'GET',
  //   url: 'https://api-nba-v1.p.rapidapi.com/games',
  //   params: {date: optionsSecondDatePlusOneString},
  //   headers: {
  //     'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  //     'X-RapidAPI-Key': '0b2412a6e1mshbf127d6abe5baf8p1cfa51jsna457e8b163c2'
  //   }
  // }), [optionsSecondDatePlusOneString] 
  // )


  useEffect(() => {
    
    axios.request(optionsFirst)
      .then((res) => {
        setGamesArray(res.data.response)
      })
      .catch((err)=> {
        console.log(err)
      });
  }, [optionsFirst]);

  // useEffect(() => {
    
  //   axios.request(optionsSecond)
  //     .then((res) => {
  //       setDayAfterGamesArray(res.data.response)
  //     })
  //     .catch((err)=> {
  //       console.log(err)
  //     });
  // }, [optionsSecond]);

    //console.log(gamesArray)
    // console.log(dayAfterGamesArray)

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