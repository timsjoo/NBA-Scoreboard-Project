import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import ScheduleCard from '../components/ScheduleCard';
import { SimpleGrid, Container, Heading, Box, Flex } from '@chakra-ui/react';
import DatePicker from 'react-date-picker';
import Navbar from '../components/Navbar';

const Schedule = (props) => {

  const [gamesArray, setGamesArray] = useState([]);
  const [user, setUser] = useState({});
  // const [dayAfterGamesArray, setDayAfterGamesArray] = useState([]);
  const [value, setValue] = useState(new Date());
  const gameDate = value.toLocaleDateString('af-ZA');
  // const gameDate = value.toUTCString();
  // console.log(new Date(gameDate).getFullYear() + "-" + (new Date(gameDate).getMonth() + 1) +
  //                                                "-" + new Date(gameDate).getDate())

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`,
      { withCredentials: true }
      )
      .then((res)=> {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err)=>console.log(err))
  }, [])
  
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
    console.log(gamesArray)
    
    
    const favoriteTeamThenRender = () => {
      const newGamesArray = gamesArray
      newGamesArray.map((game, index) => game.teams.home.id === user.favoriteTeam|| game.teams.visitors.id === user.favoriteTeam ? newGamesArray.unshift(newGamesArray.splice(index, 1)[0]) : null )
      console.log(newGamesArray)
    }
    favoriteTeamThenRender()
    
  return(
    <Box bg= "background.dark" h="100%" width="100%">
    <Box
      h="100vh"
      
    >
      <Navbar />
      <Container
        
        m="auto"
        pb="80px"
        px="40px"
        minWidth="700px"
        maxWidth="1600px"
        backgroundColor={'background.dark'}
      >
        <Flex flexDirection={'column'} align="center">
        <Heading my="20px" color="#DBE8F8" fontFamily={'Lato, sans-serif'}>Games</Heading>
        <Box bg="white" width="155.5px" p="0" mb="35px">
        <DatePicker onChange={setValue} value={value}/>
        </Box>
        </Flex>
        <SimpleGrid 
          columns={3} 
          py="20px"
          px="20px"
          rounded='lg' 
          minChildWidth="460px"
          bg="background.slightDark"
          spacingX={"30px"}
        >
          
          {gamesArray.map((gameObject) => {
          return <ScheduleCard key={gameObject.id} gameObject={gameObject} user={user}/>
          })}
        </SimpleGrid>
      </Container>
    </Box>
    </Box>
  )
}

export default Schedule;