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
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', String(newPage));
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('limit', String(newLimit));
      newParams.set('page', '1');
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const setSort = useCallback(
    (newSort: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('sort', newSort);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (newSearch.trim()) {
        newParams.set('page', '1');
        newParams.set('search', newSearch);
      } else {
        newParams.set('page', '1');
        newParams.delete('search');
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
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
