import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      content: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Todo App</Heading>
      <HStack mb={4}>
        <Input placeholder="Add your new todo" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
          Add
        </Button>
      </HStack>
      <VStack spacing={4} align="stretch">
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text flex={1}>{todo.content}</Text>
            <IconButton icon={<FaTrash />} aria-label="Delete todo" colorScheme="red" onClick={() => handleDeleteTodo(todo.id)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
