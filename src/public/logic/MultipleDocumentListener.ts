import SingleDocumentModel from "./SingleDocumentModel";
import {Equality} from "ts-list";

export default interface MultipleDocumentListener extends Equality<MultipleDocumentListener> {

  currentDocumentChanged(previousModel: SingleDocumentModel, currentModel: SingleDocumentModel): void;

  documentAdded(model: SingleDocumentModel): void;

  documentRemoved(model: SingleDocumentModel): void;
}