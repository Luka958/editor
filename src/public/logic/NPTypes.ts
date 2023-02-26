export type File = {
  path: string,
  name: string,
  content: string,
  modified?: boolean
};

export type Directory = {
  path: string,
  name: string,
  children?: (File | Directory)[]
};

export type StatusBarInfo = {
  length: number,
  ln: number,
  col: number,
  sel: number
}