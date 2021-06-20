import React from "react";

import { StoreProvider } from "./store";
import { MenuProvider } from "./menu";
import { PalleteProvider } from "./pallete";

const AppProvider: React.FC = ({ children }) => (
  <StoreProvider>
    <PalleteProvider>
      <MenuProvider>{children}</MenuProvider>
    </PalleteProvider>
  </StoreProvider>
);

export default AppProvider;
