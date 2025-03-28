import { app, BrowserWindow, ipcMain } from 'electron';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { ipcMainHandle, ipcMainOn, isDev } from './utils.js';
import { createMenu } from './menu.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandle('getStaticData', () => {
    return getStaticData();
  });

// main.ts
ipcMain.handle('fetchReceipts', async (): Promise<ApiResponse<Receipt[]>> => {
  try {
    const response = await fetch('https://next-fiscalgem.vercel.app/api/storage');
    const data = await response.json();
    return {
      success: true,
      data: Array.isArray(data) ? data : (data.data || [])
    };
  } catch (error) {
    console.error('Failed to fetch receipts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch receipts'
    };
  }
});

// // Add this to send view changes
// function sendViewChange(view: View) {
//   mainWindow?.webContents.send('changeView', view);
// }

  ipcMainOn('sendFrameAction', (payload: any) => {
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

  createTray(mainWindow);
  handleCloseEvents(mainWindow);
  createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}
