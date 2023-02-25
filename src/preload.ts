// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import {ipcRenderer, contextBridge} from 'electron';
import {File, Directory} from './public/logic/NPTypes';

type FileCallback = (file: File) => void;
type DirCallback = (dir: Directory) => void;

let prevSaveListener: { (...args: never[]): void; (): void; } = undefined;

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
    newFile: (cb: (file: File) => void) => {
      ipcRenderer.on('new-file', (e, file: File) => cb(file));
    },
    newDirectory: (cb: (dirname: string) => void) => {
      ipcRenderer.on('new-directory', (e, dirname) => cb(dirname));
    },
    save: (cb: () => File) => {
      // due to the fact that the save method is called whenever the files or
      // activeFile are changed, the old listener (prevSaveListener) must be
      // replaced with the new one
      const listener = () => {
        ipcRenderer.send('save-reply', cb());
      };
      if (ipcRenderer.listenerCount('save') > 0) {
        ipcRenderer.removeListener('save', prevSaveListener);
      }
      ipcRenderer.on('save', listener);
      prevSaveListener = listener;
    },
    saveAs: (cb: FileCallback) => {
      ipcRenderer.on('save-as', (e, file: File) => cb(file));
    },
    openFile: (cb: FileCallback) => {
      ipcRenderer.on('open-file', (e, file: File) => cb(file));
    },
    openDirectory: (cb: DirCallback) => {
      ipcRenderer.on('open-directory', (e, dir: Directory) => cb(dir));
    }
  },
  editApi: {
    undo: (cb: FileCallback) => {
      ipcRenderer.on('undo', (e, file) => cb(file));
    },
    redo: (cb: FileCallback) => {
      ipcRenderer.on('redo', (e, file) => cb(file));
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
