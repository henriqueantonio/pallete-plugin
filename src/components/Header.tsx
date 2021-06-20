import React, { useRef } from "react";
import {
  Text,
  HStack,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

import { Menu } from "./Menu";

interface HeaderProps {
  children: string;
}

export function Header({ children }: HeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <HStack
      p="2"
      bg="gray.700"
      align="center"
      justify="space-between"
      px="5"
      boxShadow="base"
    >
      <Text color="white" fontSize="30px" fontWeight="medium">
        {children}
      </Text>
      <Button
        ref={buttonRef}
        colorScheme="blackAlpha"
        borderColor="gray.700"
        bg="gray.900"
        as={IconButton}
        aria-label="Opções"
        icon={<GiHamburgerMenu color="white" />}
        variant="outline"
        onClick={onOpen}
      />
      <Menu buttonRef={buttonRef} isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
