import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flex, Heading, Box, Container } from "@chakra-ui/react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";

const Comments = (props) => {
  const { currentGameId } = props;
  const [backendComments, setBackendComments] = useState([]);
  // const [reversedComments, setReversedComments] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // console.log(props.currentGameId)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/comments/${props.currentGameId}`)
      .then((res) => {
        // console.log(res.data);
        setBackendComments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addComment = (text, gameId) => {
    axios
      .post(
        "http://localhost:8000/api/comments",
        { text, gameId: gameId },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log({res})
        setBackendComments([res.data, ...backendComments]);
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (commentId) => {
    console.log(commentId);
    if (window.confirm("Are you sure you want to remove that comment?")) {
      axios
        .delete(`http://localhost:8000/api/comments/${commentId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          const byId = (backendComment) => {
            const matches = backendComment._id !== commentId;
            return matches;
          };
          const updatedBackendComments = backendComments.filter(byId);
          console.log(updatedBackendComments);
          setBackendComments(updatedBackendComments);
        })
        .catch((err) => console.log(err));
    }
  };

  const editComment = (text, commentId) => {
    axios
      .put(
        `http://localhost:8000/api/comments/${commentId}`,
        { text: text },
        { withCredentials: true }
      )
      .then((res) => {
        const updatedBackendComments = backendComments.map((backendComment) => {
          const isMatch = backendComment._id === commentId;
          console.log({ isMatch, id: backendComment._id, commentId });
          if (isMatch) {
            return { ...backendComment, text: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setEditForm(null);
        console.log(updatedBackendComments);
      })
      .catch((err) => console.log(err));
  };

  console.log(backendComments);

  return (
    <Flex flexDirection={"column"} pb="75px" bg="background.dark">
      {user._id && (
        <CommentForm handleSubmit={addComment} currentGameId={currentGameId} />
      )}
      <Flex flexDirection={"column"}>
        {backendComments.map((comment) => (
          <Comment
            key={comment._id}
            userId={user._id}
            comment={comment}
            deleteComment={deleteComment}
            editForm={editForm}
            setEditForm={setEditForm}
            editComment={editComment}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Comments;
