export interface ResponseDTO<T> {
    status: number;
    success: boolean;
    message: string;
    data: T;

}