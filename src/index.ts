import {app, BrowserWindow, Menu, dialog, ipcMain, shell} from 'electron';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import isDev from 'electron-is-dev';
import {File, Directory} from './public/logic/NPTypes';
import IpcMainEvent = Electron.IpcMainEvent;

// auto-generated by Forge's Webpack
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const INITIAL_WIDTH = 1024;
const INITIAL_HEIGHT = 720;
const DOCUMENTATION = 'https://github.com/Luka958/editor';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// ---------- make an electron attribute of the window global ---------- //
declare global {
  interface Window {
    electron: any;
  }
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
      allowRunningInsecureContent: false,
      webSecurity: true
    }
  });

  // and load the index.html of the app.
  const URL_FOR_PRODUCTION = `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(isDev ? MAIN_WINDOW_WEBPACK_ENTRY : URL_FOR_PRODUCTION)
    .then(() => {
      console.log('Page loaded successfully');
    })
    .catch((error) => {
      console.error('Failed to load page:', error);
    });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  const INITIAL_ZOOM_FACTOR = mainWindow.webContents.getZoomFactor();
  const mainMenu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          accelerator: 'Ctrl+N',
          click() {
            dialog.showSaveDialog({
              title: 'New File',
              defaultPath: '~/Documents/',
              buttonLabel: 'Create',
              filters: [
                { name: 'All Files', extensions: ['*'] }
              ]
            }).then(result => {
              if (!result.canceled) {
                fs.writeFileSync(result.filePath, '');

                mainWindow.webContents.send('new-file', {
                  path: result.filePath,
                  name: path.basename(result.filePath),
                  content: ''
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        },
        {
          label: 'New Directory',
          accelerator: 'Ctrl+Shift+N',
          click() {
            console.log("new dir");
            console.log("new dir");
          }
        },
        {
          label: 'Open File',
          accelerator: 'Ctrl+O',
          click() {
            dialog.showOpenDialog({
              properties: ['openFile'],
              defaultPath: os.homedir()

            }).then(res => {
              if (res.canceled) {
                return;
              }
              res.filePaths.forEach(filePath => {
                const content: string = fs.readFileSync(filePath.toString()).toString();
                mainWindow.webContents.send('open-file', {
                  path: filePath,
                  name: path.basename(filePath),
                  content: content
                });
              });
            });
          }
        },
        {
          label: 'Open Directory',
          accelerator: 'Ctrl+Shift+O',
          click() {
            dialog.showOpenDialog({
              properties: ['openDirectory'],
              defaultPath: os.homedir()

            }).then(res => {
              if (res.canceled) {
                return;
              }
              res.filePaths.forEach(async (dirPath) => {

                async function buildTree(dir: Directory) {
                  try {
                    fs.readdirSync(dir.path).forEach(file => {
                      const filePath = path.join(dir.path, file);
                      try {
                        const stats = fs.statSync(filePath);
                        if (stats.isDirectory()) {
                          const newDir: Directory = {
                            name: file,
                            path: filePath,
                            children: []
                          };
                          dir.children.push(newDir);
                          buildTree(newDir);

                        } else if (stats.isFile()) {
                          dir.children.push({
                            name: file,
                            path: filePath,
                            content: fs.readFileSync(filePath.toString()).toString()
                          });
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }
                const root: Directory = {
                  name: path.dirname(dirPath),
                  path: dirPath,
                  children: []
                };
                await buildTree(root);
                mainWindow.webContents.send('open-directory', root);
              });
            });
          }
        },
        {
          label: 'Save',
          accelerator: 'Ctrl+S',
          click() {
            mainWindow.webContents.send('save');
            ipcMain.on('save-reply', (e: IpcMainEvent, file: File) => {
              fs.writeFile(file.path, file.content, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            });
          }
        },
        {
          label: 'Save As',
          accelerator: 'Ctrl+Shift+S',
          click() {
            dialog.showSaveDialog({
              title: 'Save File',
              defaultPath: '~/Documents/',
              buttonLabel: 'Save',
              filters: [
                { name: 'Text Files', extensions: ['txt'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            }).then(result => {
              if (!result.canceled) {
                console.log(result.filePath);
                // write file to the selected filePath
              }
            }).catch(err => {
              console.log(err);
            })
          }
        },
        {
          label: 'Save All',
          accelerator: 'Ctrl+Shift+A',
          click() {
            mainWindow.webContents.send('save-all');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          accelerator: 'Ctrl+Shift+X',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Ctrl+M',
          click() {
            mainWindow.minimize();

          }
        },
        {
          label: 'Maximize',
          accelerator: 'F11',
          click() {
            mainWindow.maximize();
          }
        },
        {
          label: 'Restore',
          accelerator: 'F12',
          click() {
            mainWindow.setSize(INITIAL_WIDTH, INITIAL_HEIGHT);
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Ctrl+R',
          click() {
            mainWindow.reload();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Zoom In',
          accelerator: 'F1',
          click() {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(currentZoom + 0.2);
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'F2',
          click() {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(currentZoom - 0.2);
          }
        },
        {
          label: 'Actual Size',
          accelerator: 'F3',
          click() {
            mainWindow.webContents.setZoomFactor(INITIAL_ZOOM_FACTOR);
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          accelerator: 'Ctrl+X'
        },
        {
          label: 'Copy',
          accelerator: 'Ctrl+C'
        },
        {
          label: 'Paste',
          accelerator: 'Ctrl+V'
        },
        {
          type: 'separator'
        },
        {
          label: 'Select All',
          accelerator: 'Ctrl+A'
        },
        {
          type: 'separator'
        },
        {
          label: 'Undo',
          accelerator: 'Ctrl+Z',
          click() {
            mainWindow.webContents.send('undo');
          }
        },
        {
          label: 'Redo',
          accelerator: 'Ctrl+Y',
          click() {
            mainWindow.webContents.send('redo');
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click() {
            shell.openExternal(DOCUMENTATION)
              .then(() => {return;});
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('save-dialog', (event, args) => {
  const result = dialog.showMessageBoxSync(args.options);
  switch (result) {
    case 1:
      // close without saving
      break;
    default:
      fs.writeFile(args.file.path, args.file.content, (err) => {
        if (err) {
          console.log(err);
        }
      });
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// todo https://stackoverflow.com/questions/62433323/using-the-electron-ipcrenderer-from-a-front-end-javascript-file