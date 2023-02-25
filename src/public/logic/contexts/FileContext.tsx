import React, {createContext, useReducer, useState} from "react";
import {fileReducer, ACTION_TYPE} from "../reducers/FileReducer";
import {File} from "../NPTypes";

interface FileContextType {
  files: File[];
  dispatchFiles: React.Dispatch<ACTION_TYPE>;
  activeFile: File;
  setActiveFile: React.Dispatch<React.SetStateAction<File>>;
}

export const FileContext = createContext<FileContextType>(undefined);

export default function FileContextProvider(props: { children: JSX.Element }) {

  const [files, dispatchFiles] = useReducer(fileReducer, []);
  const [activeFile, setActiveFile] = useState<File>(null);

  return (
    <FileContext.Provider value={{ files, dispatchFiles, activeFile, setActiveFile }}>
      {props.children}
    </FileContext.Provider>
  );
}