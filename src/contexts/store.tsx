import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

type OnMessageEvent = {
  pluginMessage: Message;
};

type Payload = {
  key: string;
  value?: any;
};

interface Message {
  type: string;
  payload: Payload;
}

interface Data {}

interface StoreContextData {
  data: Data;
  handlePostMessage: (type: string, payload: any) => void;
}

const StoreContext = createContext<StoreContextData>({} as StoreContextData);

const StoreProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({});

  onmessage = (event: MessageEvent<OnMessageEvent>) => {
    const msg = event.data.pluginMessage;
    if (!msg?.type || !msg?.payload) return; // for websocket interruption
    console.log(`Message received: ${msg.type}, ${msg.payload}`);
    setData((oldData) => ({ [msg.type]: msg.payload, ...oldData }));
  };

  const handlePostMessage = useCallback((type: string, payload: any) => {
    parent.postMessage({ pluginMessage: { type, payload } }, "*");
  }, []);

  return (
    <StoreContext.Provider value={{ data, handlePostMessage }}>
      {children}
    </StoreContext.Provider>
  );
};

function useStore(): StoreContextData {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
}

export { StoreProvider, useStore };
