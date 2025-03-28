import { WebContents, WebFrameMain } from 'electron';
export declare function isDev(): boolean;
export declare function ipcMainHandle<Key extends keyof EventPayloadMapping>(key: Key, handler: () => EventPayloadMapping[Key]): void;
export declare function ipcMainOn<Key extends keyof EventPayloadMapping>(key: Key, handler: (payload: EventPayloadMapping[Key]) => void): void;
export declare function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(key: Key, webContents: WebContents, payload: EventPayloadMapping[Key]): void;
export declare function validateEventFrame(frame: WebFrameMain | null): void;
//# sourceMappingURL=utils.d.ts.map