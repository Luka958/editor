import {File} from "../NPTypes";

export enum FileAction {
  ADD_FILE,
  REMOVE_FILE,
  UPDATE_MODIFICATION_STATUS
}

export type ACTION_TYPE = {
  type: FileAction,
  payload: File,
  modified?: boolean
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
  }
}