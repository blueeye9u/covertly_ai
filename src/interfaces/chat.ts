export enum EShareability {
    VIEW = "VIEW",
    VIEW_AND_DOWNLOAD = "VIEW_AND_DOWNLOAD",
}

export interface IShareChat {
    shareability: EShareability;
    chat: string;
}