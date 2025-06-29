import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

interface PaginationParams {
  defaultPage?: number;
  defaultLimit?: number;
  defaultSort?: string;
  defaultSearch?: string;
}

export const usePagination = ({
  defaultPage = 1,
  defaultLimit = 10,
  defaultSort = '',
  defaultSearch = '',
}: PaginationParams = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') || '', 10);
  const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : defaultPage;

  const rawLimit = parseInt(searchParams.get('limit') || '', 10);
  const limit = !isNaN(rawLimit) && rawLimit > 0 ? rawLimit : defaultLimit;

  const sort = searchParams.get('sort') || defaultSort;
  const search = searchParams.get('search') || defaultSearch;

  const setPage = useCallback(
    (newPage: number) => {
      const currentParams = new URLSearchParams(window.location.search); // ✅ latest values
      currentParams.set('page', String(newPage));
      setSearchParams(currentParams);
    },
    [setSearchParams],
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('limit', String(newLimit));
      currentParams.set('page', '1'); // this is okay: changing limit should reset page
      setSearchParams(currentParams);
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentSearch = currentParams.get('search') || '';

      // ❗ Only reset page if search actually changed
      if (newSearch.trim() !== currentSearch.trim()) {
        currentParams.set('page', '1');
      }

      if (newSearch.trim()) {
        currentParams.set('search', newSearch);
      } else {
        currentParams.delete('search');
      }

      setSearchParams(currentParams);
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (newSort: string) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set('sort', newSort);
      setSearchParams(currentParams);
    },
    [setSearchParams],
  );

  const goToNextPage = useCallback(
    (totalPages: number) => {
      if (page < totalPages) setPage(page + 1);
    },
    [page, setPage],
  );

  const goToPrevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);

  return {
    page,
    limit,
    sort,
    search,
    setPage,
    setLimit,
    setSort,
    setSearch,
    goToNextPage,
    goToPrevPage,
  };
};
