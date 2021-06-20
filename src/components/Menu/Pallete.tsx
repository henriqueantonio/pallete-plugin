import React from "react";
import { Stack, StackProps, Box } from "@chakra-ui/react";

import { Text } from "./Text";

interface PalleteProps extends StackProps {
  children?: string;
  color?: string;
  disabled?: boolean;
}

export function Pallete({
  children,
  color = "white",
  disabled = false,
  ...rest
}: PalleteProps) {
  return (
    <Stack
      bg="gray.900"
      w="100%"
      p="3"
      direction="row"
      justify="space-between"
      align="center"
      cursor="pointer"
      {...rest}
    >
      <Text disabled={disabled}>{children}</Text>
      <Box
        bg={color}
        p="2"
        boxShadow="dark-lg"
        border="1px"
        borderColor="gray.700"
      />
    </Stack>
  );
}
