export interface Page<T> {
    content: T[];
    last: boolean;
    first: boolean;
    empty: boolean;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    number: number;
    size: number;
    sort: Sort;
    pageable: {
        sort: Sort;
        offset: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    }
}

export interface Pageable {
    page: number;
    size: number;
    sort: string[];
    direction: SortingDirection;
}

export enum SortingDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}