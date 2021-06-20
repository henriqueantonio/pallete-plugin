import React from "react";
import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";

interface TextProps extends ChakraTextProps {
  children?: string;
  disabled?: boolean;
}

export function Text({ children, disabled = false, ...rest }: TextProps) {
  return (
    <ChakraText
      fontSize="16px"
      color={disabled ? "#6F727B" : "white"}
      {...rest}
    >
      {children}
    </ChakraText>
  );
}
