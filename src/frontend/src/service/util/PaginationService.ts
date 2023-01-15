import {Page, Pageable, Sort, SortingDirection} from "../../model/data/Page";
import {Dispatch, SetStateAction, useState} from "react";

export interface PageableState {
    pageable: Pageable;
    setPageable: Dispatch<SetStateAction<Pageable>>;
}

export class PaginationService {

    public static getDefaultPageableState = (): PageableState => {
        const [pageable, setPageable] = useState<Pageable>(this.getDefaultPageable());

        return {
            pageable: pageable,
            setPageable: setPageable
        } as PageableState;
    }

    public static getDefaultPage = <T> (): Page<T> => {
        return {
            content: [],
            last: true,
            first: true,
            empty: true,
            totalElements: 0,
            totalPages: 0,
            numberOfElements: 0,
            number: 0,
            size: 0,
            sort: this.getDefaultSort(),
            pageable: {
                sort: this.getDefaultSort(),
                offset: 0,
                pageSize: 0,
                paged: false,
                unpaged: true
            }
        } as Page<T>;
    }

    private static getDefaultPageable = (): Pageable => {
        return {
            page: 0,
            size: 10,
            sort: ["id"],
            direction: SortingDirection.DESC
        } as Pageable;
    }

    private static getDefaultSort = (): Sort => {
        return {
            sorted: false,
            unsorted: true,
            empty: true
        } as Sort;
    }

    public static getPageableWithNextPage = (pageable: Pageable): Pageable => {
        const prevState = {...pageable};

        return  {
            ...prevState,
            page: prevState.page + 1
        } as Pageable
    }
}