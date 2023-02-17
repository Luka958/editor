import SingleDocumentListener from "./SingleDocumentListener";
import TextComponent from "../components/TextComponent";

export default interface SingleDocumentModel {

  getTextComponent(): TextComponent;

  getFilePath(): string;

  setFilePath(path: string): void;

  isModified(): boolean;

  setModified(modified: boolean): void;

  addSingleDocumentListener(l: SingleDocumentListener): void;

  removeSingleDocumentListener(l: SingleDocumentListener): void;
}