import MultipleDocumentModel from "./MultipleDocumentModel";
import SingleDocumentModel from "./SingleDocumentModel";
import MultipleDocumentListener from "./MultipleDocumentListener";
import {ArrayList} from 'ts-list';
import {DefaultSingleDocumentModel} from "./DefaultSingleDocumentModel";

export default class DefaultMultipleDocumentModel implements MultipleDocumentModel {

  private currentDocument: SingleDocumentModel;
  private listeners: ArrayList<MultipleDocumentListener>;
  private documents: ArrayList<SingleDocumentModel>;

  constructor() {
    this.listeners = new ArrayList<MultipleDocumentListener>();
    this.documents = new ArrayList<SingleDocumentModel>();
  }

  openDocument(path: string, content: string): SingleDocumentModel {
    const newDocument = new DefaultSingleDocumentModel(path, content);

    // check if the document with given path is already opened

    return newDocument;
  }

  saveDocument(model: SingleDocumentModel, newPath: string): void {
    console.log()
  }

  closeDocument(model: SingleDocumentModel): void {
    const index = this.documents.indexOf(model);

    if (index === -1) {
      // closing a document that isn't opened
      return;
    }
    // todo remove tab from editor
    this.documents.removeIndex(index);
    this.listeners.forEach(l => l.documentRemoved(model));
  }

  createNewDocument(): SingleDocumentModel {
    return undefined;
  }

  getCurrentDocument(): SingleDocumentModel {
    return this.currentDocument;
  }

  getDocumentFromIndex(index: number): SingleDocumentModel {
    return this.documents.get(index);
  }

  getDocumentFromPath(path: string): SingleDocumentModel {
    for (let i = 0; i < this.documents.size(); i++) {
      if (this.documents.get(i).getFilePath() === path) {
        return this.documents.get(i);
      }
    }
    return null;
  }

  getIndexOfDocument(doc: SingleDocumentModel): number {
    for (let i = 0; i < this.documents.size(); i++) {
      if (this.documents.get(i) === doc) {
        return i;
      }
    }
    return -1;
  }

  getNumberOfDocuments(): number {
    return this.documents.size();
  }

  addMultipleDocumentListener(l: MultipleDocumentListener): void {
    this.listeners.add(l);
  }

  removeMultipleDocumentListener(l: MultipleDocumentListener): void {
    this.listeners.remove(l);
  }
}