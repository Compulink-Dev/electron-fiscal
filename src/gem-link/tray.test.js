"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tray_js_1 = require("./tray.js");
const electron_1 = require("electron");
vitest_1.vi.mock('electron', () => {
    return {
        Tray: vitest_1.vi.fn().mockReturnValue({
            setContextMenu: vitest_1.vi.fn(),
        }),
        app: {
            getAppPath: vitest_1.vi.fn().mockReturnValue('/'),
            dock: {
                show: vitest_1.vi.fn(),
            },
            quit: vitest_1.vi.fn(),
        },
        Menu: {
            buildFromTemplate: vitest_1.vi.fn(),
        },
    };
});
const mainWindow = {
    show: vitest_1.vi.fn(),
};
(0, vitest_1.test)('', () => {
    (0, tray_js_1.createTray)(mainWindow);
    const calls = electron_1.Menu.buildFromTemplate.mock.calls;
    const args = calls[0];
    const template = args[0];
    (0, vitest_1.expect)(template).toHaveLength(2);
    (0, vitest_1.expect)(template[0].label).toEqual('Show');
    template[0]?.click?.(null, null, null);
    (0, vitest_1.expect)(mainWindow.show).toHaveBeenCalled();
    (0, vitest_1.expect)(electron_1.app?.dock?.show).toHaveBeenCalled();
    template[1]?.click?.(null, null, null);
    (0, vitest_1.expect)(electron_1.app.quit).toHaveBeenCalled();
});
//# sourceMappingURL=tray.test.js.map