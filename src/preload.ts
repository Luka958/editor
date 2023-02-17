// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {ipcRenderer, contextBridge} from 'electron';
import {File} from './public/components/TabbedPane';

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message: object) {
      ipcRenderer.send('notify', message);

      ipcRenderer.addListener('notify-response', (res, msg) => {
        console.log(res)
        console.log(msg)
      })
    },
  },
  fileApi: {
    openFile: (cb: (file: File) => void) => {
      ipcRenderer.on('open-file', (e, file) => cb(file));
    },
    openDirectory: (cb: (file: File) => void) => {
      ipcRenderer.on('open-directory', (e, file) => cb(file));
    }
  }
});
