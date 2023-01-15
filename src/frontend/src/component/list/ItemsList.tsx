import {Page, Pageable} from "../../model/data/Page";
import useScrollFetch from "../../hook/useScrollFetch";
import React, {Fragment, useEffect, useState} from "react";
import {Entity} from "../../model/entity/Entity";
import {PaginationService} from "../../service/util/PaginationService";
import LoadingSpinner from "../util/loading-spinner/LoadingSpinner";

interface ItemListProps<T> {
    loadItems: (pageable: Pageable) => Promise<Page<T>>;
    mapItem: (item: T) => JSX.Element;
    items: Page<T>;
    setItems: (items: Page<T>) => void;
}

const ItemsList = <T extends Entity>(props: ItemListProps<T>) => {
    const {pageable, setPageable} = PaginationService.getDefaultPageableState();
    const [loading, setLoading] = useState(false);

    const {
        loadItems,
        mapItem,
        items,
        setItems
    } = props;

    const hasMore = !items.last;

    useEffect(() => {
        onScrollDownHandler();
    }, []);

    const onScrollDownHandler = () => {
        setLoading(true);
        setPageable(PaginationService.getPageableWithNextPage(pageable));

        loadItems(pageable).then(page => {
            const newContent = [...items.content, ...page.content];
            setItems({...page, content: newContent});
        }).finally(() => setLoading(false));
    }

    const lastItemRef = useScrollFetch({
        loading,
        hasMore,
        onScrollDownHandler
    });

    return (
        <Fragment>
            {items.content.length > 0 &&
                items.content.map((item, index) =>
                    <Fragment key={item.id}>
                        {items.content.length === index + 1
                            ? <div ref={lastItemRef}>{mapItem(item)}</div>
                            : <div>{mapItem(item)}</div>
                        }
                        <hr className="item-separator"/>
                    </Fragment>
                )
            }
            {/*{!loading && items.content.length === 0 &&*/}
            {/*    <div className="cant-load-data">*/}
            {/*        Can not load data..*/}
            {/*    </div>}*/}
            {loading && <LoadingSpinner/>}
        </Fragment>
    );
};

export default ItemsList;
