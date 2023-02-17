import SingleDocumentModel from "./SingleDocumentModel";

export default interface SingleDocumentListener {

  documentModifyStatusUpdated(model: SingleDocumentModel): void;

  documentFilePathUpdated(model: SingleDocumentModel): void;
}