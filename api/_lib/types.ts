export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    academyName: string;
    fontSize: string;
    courseName: string | undefined;
    logo: string;
    textColor: string | undefined;
    bgColor: string | undefined;
}

export interface ParsedRequestForURL {
    fileType: FileType;

}
