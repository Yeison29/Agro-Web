export interface InewItem{
    id : number;
    title ?: {
        first : string;
        second : string;
    };
    description ?: string;
    videoLink ?: string;
    image ?: string;
    order ?: number;
    marginLeft ?: number;
}