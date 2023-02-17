import SingleDocumentModel from "./SingleDocumentModel";
import MultipleDocumentListener from "./MultipleDocumentListener";

export default interface MultipleDocumentModel {

  createNewDocument(): SingleDocumentModel;

  getCurrentDocument(): SingleDocumentModel;

  openDocument(path: string, content: string): SingleDocumentModel;

  saveDocument(model: SingleDocumentModel, newPath: string): void;

  closeDocument(model: SingleDocumentModel): void;

  addMultipleDocumentListener(l: MultipleDocumentListener): void;

  removeMultipleDocumentListener(l: MultipleDocumentListener): void;

  getNumberOfDocuments(): number;

  getDocumentFromIndex(index: number): SingleDocumentModel;

  getDocumentFromPath(path: string): SingleDocumentModel;

  getIndexOfDocument(doc: SingleDocumentModel): number;
}