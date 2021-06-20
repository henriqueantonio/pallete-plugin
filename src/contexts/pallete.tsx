import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { TableContent } from "../components/Content/Table";
import { useStore } from "./store";

interface PalleteContextData {
  pallete: string;
  colors: TableContent[];
  gradients: TableContent[];
  handleChangePallete: (newPallete: string) => void;
  handleAddColor: (newColor: TableContent) => void;
  handleAddGradient: (newGradient: TableContent) => void;
  handleDelColor: (newColor: TableContent) => void;
  handleDelGradient: (newGradient: TableContent) => void;
}

const PalleteContext = createContext<PalleteContextData>(
  {} as PalleteContextData
);

const PalleteProvider: React.FC = ({ children }) => {
  const { data, handlePostMessage } = useStore();
  const [pallete, setPallete] = useState("Não definido");
  const [colors, setColors] = useState<TableContent[]>([]);
  const [gradients, setGradients] = useState<TableContent[]>([]);

  const handleChangePallete = useCallback((newPallete: string) => {
    handlePostMessage("storage-set", {
      key: "pallete",
      value: JSON.stringify(newPallete),
    });
    setPallete(newPallete);
  }, []);

  const handleAddColor = useCallback((newColor: TableContent) => {
    setColors((oldColors) => [...oldColors, newColor]);
  }, []);

  const handleAddGradient = useCallback((newGradient: TableContent) => {
    setGradients((oldGradients) => [...oldGradients, newGradient]);
  }, []);

  const handleDelColor = useCallback((newColor: TableContent) => {
    setColors((oldColor) => oldColor.filter((c) => c !== newColor));
  }, []);

  const handleDelGradient = useCallback((newGradient: TableContent) => {
    setGradients((oldGradient) => oldGradient.filter((g) => g !== newGradient));
  }, []);

  const handleRgbToHex = useCallback(({ r, g, b }: RGB) => {
    return (
      "#" +
      ((1 << 24) + ((r * 255) << 16) + ((g * 255) << 8) + b * 255)
        .toString(16)
        .slice(1, 7)
    );
  }, []);

  const handleRgbToHsl = useCallback(({ r, g, b }: RGB) => {
    let rgb: number[] = [];
    let min = 0,
      max = 0,
      i = 0,
      l = 0,
      s = 0,
      h = 0,
      maxColor = 0;

    rgb[0] = r * 255;
    rgb[1] = g * 255;
    rgb[2] = b * 255;

    min = rgb[0];
    max = rgb[0];
    maxColor = 0;

    for (i = 0; i < rgb.length - 1; i++) {
      if (rgb[i + 1] <= min) {
        min = rgb[i + 1];
      }
      if (rgb[i + 1] >= max) {
        max = rgb[i + 1];
        maxColor = i + 1;
      }
    }

    if (maxColor == 0) {
      h = (rgb[1] - rgb[2]) / (max - min);
    } else if (maxColor == 1) {
      h = 2 + (rgb[2] - rgb[0]) / (max - min);
    } else if (maxColor == 2) {
      h = 4 + (rgb[0] - rgb[1]) / (max - min);
    }

    if (isNaN(h)) {
      h = 0;
    }

    h = h * 60;

    if (h < 0) {
      h = h + 360;
    }

    l = (min + max) / 2;

    if (min == max) {
      s = 0;
    } else {
      if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
    }
    return { h, s, l };
  }, []);

  useEffect(() => {
    handlePostMessage("storage-get", { key: "pallete" });
  }, []);

  useEffect(() => {
    const p = data["storage-pallete"];
    if (!p) return;
    setPallete(JSON.parse(p));
  }, [data["storage-pallete"]]);

  return (
    <PalleteContext.Provider
      value={{
        pallete,
        colors,
        gradients,
        handleAddColor,
        handleAddGradient,
        handleChangePallete,
        handleDelColor,
        handleDelGradient,
      }}
    >
      {children}
    </PalleteContext.Provider>
  );
};

function usePallete(): PalleteContextData {
  const context = useContext(PalleteContext);

  if (!context) {
    throw new Error("usePallete must be used within a PalleteProvider");
  }

  return context;
}

export { PalleteProvider, usePallete };
