import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { IPaintStyles } from "../interfaces/IPaintStyles";
import { useStore } from "./store";

interface MenuContextData {
  theme: string;
  themes: string[];
  changeTheme: (value: string) => void;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

const MenuProvider: React.FC = ({ children }) => {
  const [themes, setThemes] = useState<string[]>([]);
  const { data, handlePostMessage } = useStore();
  const [theme, setTheme] = useState(null);

  const changeTheme = useCallback((value: string) => {
    handlePostMessage("storage-set", {
      key: "theme",
      value: JSON.stringify(value),
    });
    setTheme(value);
  }, []);

  useEffect(() => {
    // Send message to get the gradient and theme values
    handlePostMessage("storage-get", { key: "theme" });
  }, []);

  // Handle Theme
  useEffect(() => {
    // Get theme value
    const storageTheme = data["storage-theme"];
    if (!storageTheme) return;
    setTheme(storageTheme);
  }, [data["storage-theme"]]);

  // Handle Themes
  useEffect(() => {
    const ps: IPaintStyles[] = data["paintStyles"];
    if (!ps) return;
    const existentThemes = new Set<string>();

    ps.forEach((p) => {
      existentThemes.add(p.name.split("/")[1]);
    });

    setThemes([...existentThemes]);
  }, [data["paintStyles"]]);

  return (
    <MenuContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </MenuContext.Provider>
  );
};

function useMenu(): MenuContextData {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
}

export { MenuProvider, useMenu };
