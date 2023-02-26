import React, {useContext, useEffect, useState} from "react";
import TextComponent from "./TextComponent";
import Tab from "./Tab";
import {File, StatusBarInfo} from "../logic/NPTypes";
import {FileContext} from "../logic/contexts/FileContext";
import {FileAction} from "../logic/reducers/FileReducer";
import StatusBar from "./StatusBar";

export default function TabbedPane() {

  const [closedActiveTab, setClosedActiveTab] = useState(false);
  const [activeFileContent, setActiveFileContent] = useState(null);
  const [statusBarInfo, setStatusBarInfo] = useState<StatusBarInfo>(null);
  const { files, dispatchFiles, activeFile, setActiveFile } = useContext(FileContext);

  function openFileCallback(file: File) {
    file.modified = false;
    dispatchFiles({
      type: FileAction.ADD_FILE,
      payload: file
    });
    setActiveFile(file);
  }

  function saveFileCallback() {
    updateContent(activeFileContent);
    updateModificationStatus(false);
    // using object destructuring because the old content would
    // be sent to the electron if we pass only the activeFile
    return {...activeFile, content: activeFileContent};
  }

  function updateModificationStatus(modified: boolean): void {
    dispatchFiles({
      type: FileAction.UPDATE_MODIFICATION_STATUS,
      payload: activeFile,
      modified: modified
    });
  }

  function updateContent(content: string): void {
    dispatchFiles({
      type: FileAction.UPDATE_CONTENT,
      payload: activeFile,
      content: content
    });
  }

  useEffect(() => {
    window.electron.fileAPI.openFile(openFileCallback);
    window.electron.fileAPI.newFile(openFileCallback);
  }, []);

  useEffect(() => {
    window.electron.fileAPI.save(saveFileCallback);
  }, [files, activeFile]);

  useEffect(() => {
    // sets the next active file if it exists, after one of them is closed
    if (closedActiveTab) {
      setActiveFile(files.length > 0 ? files.at(files.length - 1) : null);
      setClosedActiveTab(false);

      if (activeFile !== null) {
        setActiveFileContent(activeFile.content);
      }
    }
  }, [closedActiveTab]);

  // closing file

  const [closedAnyTab, setClosedAnyTab] = useState(false);

  function handleCloseTab(file: File) {
    if (file.path !== activeFile.path) {
      setActiveFile(file);
    }
    setClosedAnyTab(true);




    // setClosedActiveTab(false);
    // // window.electron.dialogAPI.saveDialog(saveFileCallback);
    // dispatchFiles({
    //   type: FileAction.REMOVE_FILE,
    //   payload: file
    // });
  }

  useEffect(() => {
    if (closedAnyTab) {
      setClosedActiveTab(false);
      // window.electron.dialogAPI.saveDialog(saveFileCallback);
      dispatchFiles({
        type: FileAction.REMOVE_FILE,
        payload: activeFile
      });
    }
  }, [closedAnyTab, activeFile]);

  return (
    <>
      <div className="flex-direction-row">
        {files.map(file =>
          <Tab key={file.path}
               file={file}
               activePane={activeFile}
               setActivePane={() => setActiveFile(file)}
               close={() => handleCloseTab(file)}
               modified={file.modified}
          />
        )}
      </div>
      {files.map(file =>
        <TextComponent key={file.path}
                       file={file}
                       activeFile={activeFile}
                       setModified={updateModificationStatus}
                       setActiveFileContent={setActiveFileContent}
                       setStatusBarInfo={setStatusBarInfo}
        />
      )}
      {files.length > 0 && <StatusBar {...statusBarInfo} />}
    </>
  );
}