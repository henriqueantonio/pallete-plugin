import React from "react";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";

interface SelectProps extends ChakraSelectProps {}

export function Select({ ...rest }: SelectProps) {
  return (
    <ChakraSelect
      placeholder="Buscar cores não vinculadas"
      bg="gray.700"
      color="gray.500"
      borderColor="#30323C"
      focusBorderColor="blue"
      iconColor="blue"
      {...rest}
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </ChakraSelect>
  );
}
