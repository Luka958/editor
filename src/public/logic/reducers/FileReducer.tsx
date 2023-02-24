import {File} from "../NPTypes";

export type ACTION_TYPE = {
  type: string,
  payload: File
}

export const fileReducer = (state: File[], action: ACTION_TYPE) => {

  switch (action.type) {
    case 'add-file':
      return [...state, action.payload];
    case 'remove-file':
      return state.filter(book => book.path !== action.payload.path);
    default:
      return state;
  }
}