"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const resourceManager_js_1 = require("./resourceManager.js");
const pathResolver_js_1 = require("./pathResolver.js");
const tray_js_1 = require("./tray.js");
const utils_js_1 = require("./utils.js");
const menu_js_1 = require("./menu.js");
electron_1.app.on('ready', () => {
    const mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            preload: (0, pathResolver_js_1.getPreloadPath)(),
        },
        frame: false,
    });
    if ((0, utils_js_1.isDev)()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile((0, pathResolver_js_1.getUIPath)());
    }
    (0, resourceManager_js_1.pollResources)(mainWindow);
    (0, utils_js_1.ipcMainHandle)('getStaticData', () => {
        return (0, resourceManager_js_1.getStaticData)();
    });
    // main.ts
    electron_1.ipcMain.handle('fetchReceipts', async () => {
        try {
            const response = await fetch('https://next-fiscalgem.vercel.app/api/storage');
            const data = await response.json();
            return {
                success: true,
                data: Array.isArray(data) ? data : (data.data || [])
            };
        }
        catch (error) {
            console.error('Failed to fetch receipts:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch receipts'
            };
        }
    });
    // Add this to send view changes
    function sendViewChange(view) {
        mainWindow?.webContents.send('changeView', view);
    }
    (0, utils_js_1.ipcMainOn)('sendFrameAction', (payload) => {
        switch (payload) {
            case 'CLOSE':
                mainWindow.close();
                break;
            case 'MAXIMIZE':
                mainWindow.maximize();
                break;
            case 'MINIMIZE':
                mainWindow.minimize();
                break;
        }
    });
    (0, tray_js_1.createTray)(mainWindow);
    handleCloseEvents(mainWindow);
    (0, menu_js_1.createMenu)(mainWindow);
});
function handleCloseEvents(mainWindow) {
    let willClose = false;
    mainWindow.on('close', (e) => {
        if (willClose) {
            return;
        }
        e.preventDefault();
        mainWindow.hide();
        if (electron_1.app.dock) {
            electron_1.app.dock.hide();
        }
    });
    electron_1.app.on('before-quit', () => {
        willClose = true;
    });
    mainWindow.on('show', () => {
        willClose = false;
    });
}
//# sourceMappingURL=main.js.map