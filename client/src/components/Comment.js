import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import CommentForm from "./CommentForm";

const Comment = (props) => {
  const { comment, deleteComment, userId, editForm, setEditForm, editComment } =
    props;
  const canEditOrDelete = userId === comment.createdBy?._id;
  const canEdit = editForm && editForm.id === comment._id;

  const commentTime = () => {
    const newCommentTime = new Date(comment.createdAt);
    const newCommentTimeFormatted = newCommentTime.toLocaleString("en-US");
    return newCommentTimeFormatted ? newCommentTimeFormatted : null;
  };

  return (
    <Flex justifyContent={"center"} mt="20px">
      <Flex
        justifyContent={"center"}
        border="1px solid #294667"
        maxW="600px"
        minW="300px"
        rounded="lg"
        p="10px"
        bg="#152F4D"
      >
        <Flex
          flexDirection={"column"}
          width="700px"
          align={"flex-start"}
          bg="#152F4D"
        >
          <Flex>
            <Text mr="40px" fontWeight={"bold"} color="whiteAlpha.800">
              {comment.createdBy.username}
            </Text>
            <Text color="whiteAlpha.700" fontSize="xs">
              {commentTime()}
            </Text>
          </Flex>
          {!canEdit && (
            <Box
              color="whiteAlpha.900"
              textAlign="left"
              fontSize={"xs"}
              padding="5px"
            >
              {comment.text}
            </Box>
          )}
          {canEdit && (
            <CommentForm
              handleSubmit={(text) => editComment(text, comment._id)}
              hasCancelButton
              initialText={comment.text}
              handleCancel={() => setEditForm(null)}
            />
          )}
          <Flex justifyContent={"flex-end"}>
            {canEditOrDelete && (
              <Link
                mx="5px"
                onClick={() => setEditForm({ id: comment._id })}
                color="whiteAlpha.600"
              >
                Edit
              </Link>
            )}
            {canEditOrDelete && (
              <Link
                mx="5px"
                onClick={() => deleteComment(comment._id)}
                color="whiteAlpha.600"
              >
                Delete
              </Link>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comment;
