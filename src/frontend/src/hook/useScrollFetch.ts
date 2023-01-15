import {useCallback, useRef} from "react";

interface UseScrollFetchProps {
    loading: boolean,
    hasMore: boolean,
    onScrollDownHandler: () => void;
}

const useScrollFetch = (props: UseScrollFetchProps) => {
    const {
        loading,
        hasMore,
        onScrollDownHandler
    } = props;

    const observer = useRef<IntersectionObserver | null>(null);

    return useCallback((node: HTMLDivElement) => {
        if(loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                onScrollDownHandler();
            }
        })

        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore, onScrollDownHandler]);
}

export default useScrollFetch;