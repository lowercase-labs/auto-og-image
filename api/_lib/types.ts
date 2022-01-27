export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    imgDomain : string;
    imgTitle: string;
    imgDesc: string;
    templateID: number;
    color: string;
    textColor: string | undefined;
    bgColor: string | undefined;
}

export interface ParsedRequestForURL {
    fileType: FileType;

}
