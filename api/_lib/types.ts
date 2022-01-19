export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    imgTitle: string;
    imgDesc: string;
    logo: string;
    textColor: string | undefined;
    bgColor: string | undefined;
}

export interface ParsedRequestForURL {
    fileType: FileType;

}
