import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Flex,
} from "@chakra-ui/react";

const CommentForm = (props) => {
  const {
    handleSubmit,
    currentGameId,
    initialText = "",
    hasCancelButton = false,
    handleCancel,
  } = props;

  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text, currentGameId);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <Flex justifyContent={'center'} align="center">
          <Textarea
            mx="20px"
            mt="10px"
            maxW="500px"
            value={text}
            name={text}
            onChange={(e) => setText(e.target.value)}
            color="whiteAlpha.800"
            resize="none"
          />
          <Button type="submit" disabled={isTextareaDisabled} bg="background.niceBlue">
            Submit
          </Button>
        {hasCancelButton && (
          <Button type="submit" onClick={handleCancel} ml="10px" bg="background.niceBlue">
            Cancel
          </Button>
        )}
        </Flex>
      </FormControl>
    </form>
  );
};

export default CommentForm;
