"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron = require('electron');
electron_1.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback) => {
        const handler = (_, stats) => callback(stats);
        electron_1.ipcRenderer.on('statistics', handler);
        return () => electron_1.ipcRenderer.off('statistics', handler);
    },
    subscribeChangeView: (callback) => {
        const handler = (_, view) => callback(view);
        electron_1.ipcRenderer.on('changeView', handler);
        return () => electron_1.ipcRenderer.off('changeView', handler);
    },
    getStaticData: () => electron_1.ipcRenderer.invoke('getStaticData'),
    sendFrameAction: (payload) => electron_1.ipcRenderer.send('sendFrameAction', payload),
    fetchReceipts: () => electron_1.ipcRenderer.invoke('fetchReceipts')
});
function ipcInvoke(key) {
    return electron.ipcRenderer.invoke(key);
}
function ipcOn(key, callback) {
    const cb = (_, payload) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}
function ipcSend(key, payload) {
    electron.ipcRenderer.send(key, payload);
}
