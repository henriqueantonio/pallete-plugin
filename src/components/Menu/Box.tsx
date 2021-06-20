import React, { ReactNode } from "react";
import { Stack, StackProps } from "@chakra-ui/react";

interface BoxProps extends StackProps {
  children?: ReactNode;
}

export function Box({ children, ...rest }: BoxProps) {
  return (
    <Stack bg="gray.700" w="100%" p="3" {...rest}>
      {children}
    </Stack>
  );
}
