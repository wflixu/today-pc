export interface IMenu {
  title: string;
  key: string;
  icon?: string;
  disabled?: boolean;
}

export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
export interface Attach {
  id: number;
  filename: string;
  mimeType: string;
  url: string;
  [key: string]: string | number;
}

export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
