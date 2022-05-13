import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Spacer, Image, Text, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';


const ScheduleCard = (props) => {

  const {gameObject} = props;


  return(
    <LinkBox>
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
              width="75px"
              fontSize='xs'
            >
              <LinkOverlay href={`/game/${gameObject.id}`}>
                {gameObject.teams.home.name}
              </LinkOverlay>
            </Text>
            <Heading // Points
              width="35px"
              fontSize='s'
            >
              {gameObject.scores.home.points}
            </Heading>
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
              width="75px"
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
    </LinkBox>
  )
}

export default ScheduleCard;