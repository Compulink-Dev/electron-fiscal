import { contextBridge, ipcRenderer } from "electron";

const electron = require('electron');

// Update your Window interface
interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscribeFunction;
    sendFrameAction: (payload: FrameWindowAction) => void;
    fetchReceipts: () => Promise<ApiResponse<Receipt[]>>; // Fixed - removed duplicate and made it a function
  };
}


contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: any) => {
    const handler = (_: Electron.IpcRendererEvent, stats: Statistics) => callback(stats);
    ipcRenderer.on('statistics', handler);
    return () => ipcRenderer.off('statistics', handler);
  },
  subscribeChangeView: (callback: any) => {
    const handler = (_: Electron.IpcRendererEvent, view: View) => callback(view);
    ipcRenderer.on('changeView', handler);
    return () => ipcRenderer.off('changeView', handler);
  },
  getStaticData: () => ipcRenderer.invoke('getStaticData'),
  sendFrameAction: (payload: any) => ipcRenderer.send('sendFrameAction', payload),
  fetchReceipts: () => ipcRenderer.invoke('fetchReceipts')
});

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}