import React from "react";
import { VStack } from "@chakra-ui/react";

import { Table, TableContent } from "./Table";

interface ContentProps {
  colors: TableContent[];
  gradientColors: TableContent[];
}

export function Content({ colors, gradientColors }: ContentProps) {
  return (
    <VStack
      direction="row"
      flex="1"
      align="flex-start"
      p="10"
      spacing="8"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Table
        title="Cores geradas a partir do estilo:"
        header={["hsla()", "Hue", "Sat.", "Light.", "Alpha"]}
        body={colors}
      />
      <Table
        title="Gradientes gerados a partir do estilo:"
        header={["Gradient", "Start", "End"]}
        body={gradientColors}
      />
    </VStack>
  );
}
