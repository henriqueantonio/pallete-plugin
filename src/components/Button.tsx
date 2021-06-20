import React from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Text,
  Box,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  children: string;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Box bgGradient="linear(to-l, #1695FF, #1BE7CF)" p="2px" borderRadius="8px">
      <ChakraButton {...rest} bg="gray.900" borderRadius="8px">
        <Text color="white" fontWeight="500">
          {children}
        </Text>
      </ChakraButton>
    </Box>
  );
}
