import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Spacer, Image, Text, Heading, LinkBox, LinkOverlay, useRadio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import star from '../assets/star.png'

const ScheduleCard = (props) => {

  const {gameObject, user} = props;
  const [isFavorite, setIsFavorite] = useState(false);

  

  useEffect(() => {
    if(gameObject.teams.home.id === user.favoriteTeam || gameObject.teams.visitors.id === user.favoriteTeam) {
      setIsFavorite(!isFavorite)
      console.log(isFavorite)}
  }, [])

  const gameTime = new Date(gameObject.date.start)

  return(
    <Link to={`/games/${gameObject.id}`}>
      <Flex 
        maxW="480px"
        height="110px"
        margin="auto"
        rounded="lg"
        bg="#294666"
        justifyContent={'space-between'}
        align="center"
        p="10px"
        my="20px"
      >
          <Flex // Left Side
            minW="125px"
            align="center"
          >
            <Image // Logo
              src={gameObject.teams.home.logo}
              boxSize="50px"
            />
            <Text // Name
              ml="5px"
              width="80px"
              fontSize='xs'
              color="#DBE8F8"
            >
                {gameObject.teams.home.name}
            </Text>
            <Heading // Points
              ml="10px"
              width="35px"
              fontSize='lg'
              color="#DBE8F8"
            >
              {gameObject.scores.home.points}
            </Heading>
          </Flex>
          <Flex flexDirection={'column'} align="center">
          <Flex flexDirection={'column'} width="130px" align="center">
          {
            gameObject.status.short === 1 ?
              <Text fontSize='xs' color="#DBE8F8">Scheduled</Text> :
            gameObject.status.short === 2 ?
              <Text fontSize='xs' color="#DBE8F8">In Progress</Text> :
              <Text fontSize='xs' color="#DBE8F8">Finished</Text>
          }
          {
            gameObject.status.short === 1 ? <Text fontSize='xs' color="#DBE8F8">{gameTime.toLocaleString()}</Text> :
            null
          }
          </Flex>
          {isFavorite ? <Image mt="5px" src={star} boxSize="20px" /> : null }
          </Flex>
          <Flex // Right Side
            minW="125px"
            align="center"
          >
            <Heading // Points
              width="35px"
              fontSize='lg'
              mr="10px"
              color="#DBE8F8"
            >
              {gameObject.scores.visitors.points}
            </Heading>
            <Text // Name
              mr="5px"
              width="80px"
              fontSize='xs'
              color="#DBE8F8"
            >
              {gameObject.teams.visitors.name}
            </Text>
            <Image  // Logo
              src={gameObject.teams.visitors.logo}
              boxSize="50px"
          />
          </Flex>
      </Flex>
    </Link>

  )
}

export default ScheduleCard;