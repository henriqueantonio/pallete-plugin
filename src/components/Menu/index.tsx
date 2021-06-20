import React, { useCallback, useEffect, useState } from "react";
import {
  VStack,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";

import { Box } from "./Box";
import { Pallete } from "./Pallete";
import { Select } from "./Select";
import { useStore } from "../../contexts/store";
import { useMenu } from "../../contexts/menu";
import { IPaintStyles } from "../../interfaces/IPaintStyles";
import { usePallete } from "../../contexts/pallete";

interface MenuProps {
  onClose: () => void;
  isOpen: boolean;
  buttonRef: React.MutableRefObject<HTMLButtonElement>;
}

export interface IPaintStyleProps extends IPaintStyles {
  colorHex: string;
}

export function Menu({ buttonRef, isOpen, onClose }: MenuProps) {
  const { data } = useStore();
  const { pallete, handleChangePallete } = usePallete();
  const { theme, themes, changeTheme } = useMenu();
  const [palletes, setPalletes] = useState<IPaintStyleProps[]>([]);

  const handlePallete = useCallback((values: IPaintStyles[], theme: string) => {
    return values
      .filter((value) => {
        const splittedValue = value.name.split("/");
        if (
          splittedValue[0].toLowerCase() === "pallete" &&
          theme.toLowerCase() === splittedValue[1].toLowerCase()
        ) {
          return value;
        }
      })
      .map((value) => ({
        ...value,
        name: value.name.split("/")[2],
        colorHex: handleRgbToHex(value.color),
      }));
  }, []);

  function handleRgbToHex({ r, g, b }: RGB) {
    return (
      "#" +
      ((1 << 24) + ((r * 255) << 16) + ((g * 255) << 8) + b * 255)
        .toString(16)
        .slice(1, 7)
    );
  }

  useEffect(() => {
    const paintStyles: IPaintStyles[] = data["paintStyles"];
    if (!paintStyles) return;

    const getPalletes = handlePallete(paintStyles, "Dark");
    setPalletes(getPalletes);
  }, [data["paintStyles"]]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      returnFocusOnClose={!!buttonRef}
    >
      <DrawerOverlay />
      <DrawerContent bg="gray.800">
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody
          p="0"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <VStack spacing="5" p="5" align="center">
            <Select
              values={themes}
              defaultValue={theme}
              onChange={(e) => changeTheme(e.target.value)}
            />
            <Box>
              {palletes.map((p) => (
                <Pallete
                  key={p.name}
                  disabled={p.name !== pallete}
                  color={p.colorHex}
                  onClick={() => handleChangePallete(p.name)}
                >
                  {p.name}
                </Pallete>
              ))}
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
