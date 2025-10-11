import { useCallback, useRef, useState } from 'react';
import { debounce } from 'lodash';

interface UseSearchWithAbortOptions {
    debounceMs?: number;
    maxLength?: number;
}

interface UseSearchWithAbortReturn<T> {
    searchQuery: string;
    isSearching: boolean;
    setSearchQuery: (query: string) => void;
    onChange: (e: { target: { value: any } }) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSearchIconClick: () => void;
    performSearch: (query: string) => Promise<void>;
    cleanup: () => void;
}

export const useSearchWithAbort = <T>(
    searchFunction: (query: string, signal?: AbortSignal) => Promise<T>,
    options: UseSearchWithAbortOptions = {}
): UseSearchWithAbortReturn<T> => {
    const { debounceMs = 300, maxLength = 50 } = options;
    
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const isAbortError = (error: any) =>
        error.name === 'AbortError' ||
        error.name === 'CanceledError' ||
        error.message?.includes('canceled') ||
        error.message?.includes('aborted');

    const safelyAbortPreviousRequest = () => {
        const controller = abortControllerRef.current;
        if (!controller) return;

        try {
            controller.abort();
        } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError')) {
                console.warn('Unexpected error while aborting previous request:', error);
            }
        }
    };

    const performSearch = useCallback(async (query: string) => {
        safelyAbortPreviousRequest();

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            setIsSearching(true);
            await searchFunction(query.trim(), abortController.signal);
        } catch (error: any) {
            if (isAbortError(error)) return;
            console.error('Search failed:', error);
        } finally {
            if (abortControllerRef.current === abortController) {
                setIsSearching(false);
            }
        }
    }, [searchFunction]);

    // Create debounced search function
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            performSearch(query);
        }, debounceMs),
        [performSearch, debounceMs]
    );

    const onChange = useCallback((e: { target: { value: any } }) => {
        const value = e.target.value;
        if (value.length > maxLength) {
            return;
        }
        setSearchQuery(value);
        
        if (value.trim() === "") {
            debouncedSearch.cancel();
            performSearch("");
            return;
        }
        debouncedSearch(value);
    }, [debouncedSearch, performSearch, maxLength]);

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            performSearch(searchQuery);
        }
    }, [performSearch, searchQuery]);

    const onSearchIconClick = useCallback(() => {
        performSearch(searchQuery);
    }, [performSearch, searchQuery]);

    const cleanup = useCallback(() => {
        debouncedSearch.cancel();
        if (abortControllerRef.current) {
            try {
                abortControllerRef.current.abort();
            } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) {
                    console.warn('Unexpected error while aborting fetch during cleanup:', error);
                }
            }
        }
    }, [debouncedSearch]);

    return {
        searchQuery,
        isSearching,
        setSearchQuery,
        onChange,
        onKeyDown,
        onSearchIconClick,
        performSearch,
        cleanup
    };
};
