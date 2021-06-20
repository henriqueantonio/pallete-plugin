import { IMessage } from "./interfaces/IMessage";
import { IPaintStyles } from "./interfaces/IPaintStyles";

figma.showUI(__html__, {
  height: 600,
  width: 800,
});

figma.ui.onmessage = async (msg: IMessage) => {
  const key = msg.payload.key;
  const value = msg.payload.value;

  switch (msg.type) {
    case "storage-get":
      await handleStorageGet(key);
      break;
    case "storage-set":
      await handleStorageSet(key, value);
      break;
  }
};

async function handleStorageGet(key: string) {
  const storage = await figma.clientStorage.getAsync(key);
  handlePostMessage(`storage-${key}`, storage);
}

async function handleStorageSet(key: string, value: any) {
  await figma.clientStorage.setAsync(key, value);
  handlePostMessage(`storage-${key}`, value);
}

function handlePostMessage(type: string, payload: any) {
  figma.ui.postMessage({
    type,
    payload,
  });
}

function handlePaintStyles() {
  const styles = figma.getLocalPaintStyles();

  const styleNames = styles.map((style) => {
    const paint = style.paints[0] as SolidPaint;
    return {
      name: style.name,
      color: paint.color,
    } as IPaintStyles;
  });

  handlePostMessage("paintStyles", styleNames);
}

handlePaintStyles();
