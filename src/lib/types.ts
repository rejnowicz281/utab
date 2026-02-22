export interface IDataResponse<T> {
    items: T[];
    totalCount: number;
    pageSize: number;
    pageNumber: number;
}
