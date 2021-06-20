import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "./contexts";

import { theme } from "./styles/theme";
import clientStorageAdapter from "./adapters/ClientStorageAdapter";

import { Dashboard } from "./ui/Dashboard";

export function App() {
  return (
    <AppProvider>
      <ChakraProvider theme={theme} colorModeManager={clientStorageAdapter}>
        <Dashboard />
      </ChakraProvider>
    </AppProvider>
  );
}
