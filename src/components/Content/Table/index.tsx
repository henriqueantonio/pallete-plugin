import React, { useEffect, useState } from "react";
import {
  VStack,
  StackProps,
  Text,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  HStack,
  Box,
} from "@chakra-ui/react";

import { Select } from "./Select";
import { Button } from "../../Button";
import { IHSL } from "../../../interfaces/IHSL";

export interface TableContent {
  name: string;
  colorHex: string;
  colorHsl: IHSL;
}

interface TableProps extends StackProps {
  title: string;
  header: string[];
  body: TableContent[];
}

interface LineProps {
  name: string;
  index: number;
  colorHex?: string;
}

function Line({ name, index, colorHex = "white" }: LineProps) {
  return (
    <Td
      key={index}
      colSpan={index === 0 ? 3 : 1}
      color="white"
      mt={index === 0 ? "2" : "0"}
    >
      <HStack align="center">
        {index === 0 && <Box p="2" bg={colorHex} />}
        <Text>{name}</Text>
      </HStack>
    </Td>
  );
}

export function Table({ title, header, body, ...rest }: TableProps) {
  const [content, setContent] = useState<TableContent[]>([]);

  // useEffect(() => {
  //   const bodyConverted = body.map((p) => ({
  //     ...p,
  //     colorHsl: {
  //       h: Math.trunc(p.colorHsl.h),
  //       s: p.colorHsl.s * 100,
  //       l: p.colorHsl.l * 100,
  //     },
  //   }));
  //   setContent(bodyConverted);
  // }, [body]);

  return (
    <VStack align="flex-start" {...rest} w="100%">
      <Text color="white" fontSize="x-large" fontWeight="thin">
        {title}
      </Text>
      <ChakraTable
        variant="unstyled"
        colorScheme="teal"
        fontSize="14px"
        fontWeight="medium"
      >
        <Thead bg="#16171B">
          <Tr>
            {header.map((title, index) => (
              <Th key={index} colSpan={index === 0 ? 3 : 1} color="white">
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody bg="#212125">
          {content.map((tr, index) => (
            <Tr key={index} borderColor="gray.700" borderWidth="1px">
              <Line index={index} name={tr.name} colorHex={tr.colorHex} />
              <Line index={index} name={String(tr.colorHsl.h)} />
              <Line index={index} name={String(tr.colorHsl.s)} />
              <Line index={index} name={String(tr.colorHsl.l)} />
              <Line index={index} name="100%" />
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={header.length + 3} p="0">
              <HStack flex="1" mt="2">
                <Select flex="1" />
                <Button colorScheme="blackAlpha">Adicionar cor</Button>
              </HStack>
            </Th>
          </Tr>
        </Tfoot>
      </ChakraTable>
    </VStack>
  );
}
