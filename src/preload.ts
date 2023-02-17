// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {ipcRenderer, contextBridge, dialog} from 'electron';
import {File, Directory} from './public/logic/NPTypes';

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
    newFile: (cb: (filename: string) => void) => {
      ipcRenderer.on('new-file', (e, filename) => cb(filename));
    },
    newDirectory: (cb: (dirname: string) => void) => {
      ipcRenderer.on('new-directory', (e, dirname) => cb(dirname));
    },
    save: (cb: (file: File) => void) => {
      ipcRenderer.on('save', (e, file) => cb(file));
    },
    saveAs: (cb: (file: File) => void) => {
      ipcRenderer.on('save-as', (e, file) => cb(file));
    },
    openFile: (cb: (file: File) => void) => {
      ipcRenderer.on('open-file', (e, file) => cb(file));
    },
    openDirectory: (cb: (dir: Directory) => void) => {
      ipcRenderer.on('open-directory', (e, dir) => cb(dir));
    }
  }
});

// ipcRenderer.send('show-dialog', {
//   type: 'question',
//   buttons: ['Yes', 'No'],
//   title: 'Question',
//   message: 'Do you want to do this?',
//   detail: 'This action will erase all your data'
// });
