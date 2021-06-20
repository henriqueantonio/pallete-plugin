import React from "react";
import { Flex } from "@chakra-ui/react";

import { Content } from "../components/Content";
import { Header } from "../components/Header";
import { usePallete } from "../contexts/pallete";

export function Dashboard() {
  const { pallete, colors, gradients } = usePallete();

  return (
    <Flex direction="column" h="100vh" w="100vw">
      <Header>{pallete}</Header>
      <Content colors={colors} gradientColors={gradients} />
    </Flex>
  );
}
