import React, { useState } from "react";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";

interface SelectProps extends ChakraSelectProps {
  values: string[];
}

export function Select({ values, ...rest }: SelectProps) {
  return (
    <ChakraSelect
      bg="gray.700"
      borderColor="gray.700"
      w="100%"
      borderRadius="0"
      placeholder="Escolha uma opção"
      focusBorderColor="blue"
      {...rest}
    >
      {values.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </ChakraSelect>
  );
}
