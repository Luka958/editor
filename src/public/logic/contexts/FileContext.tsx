import React, {createContext, useReducer} from "react";
import {fileReducer, ACTION_TYPE} from "../reducers/FileReducer";
import {File} from "../NPTypes";

interface FileContextType {
  files: File[];
  dispatchFiles: React.Dispatch<ACTION_TYPE>;
}

export const FileContext = createContext<FileContextType>({
  files: [],
  dispatchFiles: undefined
});

export default function FileContextProvider(props: { children: JSX.Element }) {

  const [files, dispatchFiles] = useReducer(fileReducer, []);

  return (
    <FileContext.Provider value={{files, dispatchFiles}}>
      {props.children}
    </FileContext.Provider>
  );
}