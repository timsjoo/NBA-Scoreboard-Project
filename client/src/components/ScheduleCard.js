import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Spacer, Image, Text, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const ScheduleCard = (props) => {

  const {gameObject} = props;

  return(
    <Link to={`/games/${gameObject.id}`}>
      <Flex 
        maxW="450px"
        height="110px"
        margin="auto"
        rounded="md"
        bg="#44449b"
        justifyContent={'space-between'}
        align="center"
        p="10px"
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
              width="90px"
              fontSize='xs'
            >
                {gameObject.teams.home.name}
            </Text>
            <Heading // Points
              width="35px"
              fontSize='s'
            >
              {gameObject.scores.home.points}
            </Heading>
          </Flex>
          <Flex flexDirection={'column'}>
          {
            gameObject.status.short === 1 ?
              <Text fontSize='xs'>Scheduled</Text> :
            gameObject.status.short === 2 ?
              <Text fontSize='xs'>In Progress</Text> :
              <Text fontSize='xs'>Finished</Text>
          }
          <Text fontSize='xs'>{gameObject.date.start}</Text>
          </Flex>
          <Flex // Right Side
            minW="125px"
            align="center"
          >
            <Heading // Points
              width="35px"
              fontSize='s'
            >
              {gameObject.scores.visitors.points}
            </Heading>
            <Text // Name
              width="90px"
              fontSize='xs'
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