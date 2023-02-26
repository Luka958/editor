import React, {useContext, useEffect, useState} from "react";
import TextComponent from "./TextComponent";
import Tab from "./Tab";
import {File} from "../logic/NPTypes";
import {FileContext} from "../logic/contexts/FileContext";
import {FileAction} from "../logic/reducers/FileReducer";

export default function TabbedPane() {

  const [closedActiveTab, setClosedActiveTab] = useState(false);
  const [activeFileContent, setActiveFileContent] = useState(null);
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
    window.electron.fileApi.openFile(openFileCallback);
    window.electron.fileApi.newFile(openFileCallback);
  }, []);

  useEffect(() => {
    window.electron.fileApi.save(saveFileCallback);
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

  return (
    <>
      <div className="flex-direction-row">
        {files.map(file =>
          <Tab key={file.path}
               file={file}
               activePane={activeFile}
               setActivePane={() => setActiveFile(file)}
               close={() => {
                 setClosedActiveTab(true);
                 dispatchFiles({
                   type: FileAction.REMOVE_FILE,
                   payload: file
                 });
               }}
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
        />
      )}
    </>
  );
}