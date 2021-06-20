export interface IMessage {
  type: string;
  payload: IStorage;
}

interface IStorage {
  key: string;
  value?: string;
}
