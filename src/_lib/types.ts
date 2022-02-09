export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    imgDomain : string;
    imgTitle: string;
    imgDesc: string;
    templateID: number;
    color: string;
    textColor: string | undefined;
    bgColor: string | undefined;
}
