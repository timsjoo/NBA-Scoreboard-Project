import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Flex, Heading } from '@chakra-ui/react';

const Comments = (props) => {
  const [backendComments, setBackendComments] = useState([])
  console.log(props.currentGameId)

useEffect(() => {
  axios.get(`http://localhost:8000/api/comments/${props.currentGameId}`)
    .then((res)=> {
      console.log(res.data);
      setBackendComments(res.data);
    })
    .catch((err)=>console.log(err))
}, [])


  return(
    <Flex flexDirection={'column'}>
      <Heading>Comments</Heading>
    </Flex>
  )
}

export default Comments;