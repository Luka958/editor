import SingleDocumentModel from "./SingleDocumentModel";
import SingleDocumentListener from "./SingleDocumentListener";
import {ArrayList} from "ts-list";
import TextComponent from "../components/TextComponent";

export class DefaultSingleDocumentModel implements SingleDocumentModel {

  private path: string;
  private modified: boolean;
  private readonly textComponent: TextComponent;
  private listeners: ArrayList<SingleDocumentListener>;

  public constructor(path: string, content: string) {
    this.path = path;
    this.modified = false;
    this.textComponent = new TextComponent({ content: content });
    this.listeners = new ArrayList<SingleDocumentListener>();
  }

  getTextComponent(): TextComponent {
    return this.textComponent;
  }

  addSingleDocumentListener(l: SingleDocumentListener): void {
    this.listeners.add(l);
  }

  removeSingleDocumentListener(l: SingleDocumentListener): void {
    this.listeners.remove(l);
  }

  getFilePath(): string {
    return this.path;
  }

  isModified(): boolean {
    return this.modified;
  }

  setFilePath(path: string): void {
    this.path = path;
  }

  setModified(modified: boolean): void {
    this.modified = modified;
  }

  equals(other: SingleDocumentModel): boolean {
    return this.path === other.getFilePath();
  }
}