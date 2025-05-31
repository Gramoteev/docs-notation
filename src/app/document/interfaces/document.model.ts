export interface IDocument {
  name: string;
  pages: IPage[];
}

export interface IPage {
  number: number;
  imageUrl: string;
}

export interface IAnnotation {
  id: string;
  text: string;
  x: number;
  y: number;
  pageIndex: number;
}
