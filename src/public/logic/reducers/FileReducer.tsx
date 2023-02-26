import {File} from "../NPTypes";

export enum FileAction {
  ADD_FILE,
  REMOVE_FILE,
  UPDATE_MODIFICATION_STATUS,
  UPDATE_CONTENT
}

export type ACTION_TYPE = {
  type: FileAction,
  payload: File,
  modified?: boolean,
  content?: string
}

export function fileReducer(state: File[], action: ACTION_TYPE): File[] {
  switch (action.type) {
    case FileAction.ADD_FILE:
      return [...state, action.payload];

    case FileAction.REMOVE_FILE:
      return state.filter(book => book.path !== action.payload.path);

    case FileAction.UPDATE_MODIFICATION_STATUS:
      return state.map(file => {
        if (file.path === action.payload.path) {
          return { ...file, modified: action.modified };
        }
        return file;
      });

    case FileAction.UPDATE_CONTENT:
      return state.map(file => {
        if (file.path === action.payload.path) {
          return { ...file, content: action.content };
        }
        return file;
      });
  }
}