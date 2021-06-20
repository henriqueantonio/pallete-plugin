import { StorageManager, ColorMode } from "@chakra-ui/react";

const ClientStorageAdapter: StorageManager = {
  get(init?: ColorMode): any {},

  set(value: ColorMode): void {},

  type: "localStorage",
};

export default ClientStorageAdapter;
