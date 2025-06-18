import { useSearchParams } from 'react-router-dom';

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

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  const setLimit = (newLimit: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('limit', String(newLimit));
    newParams.set('page', '1'); // reset page when limit changes
    setSearchParams(newParams);
  };

  const setSort = (newSort: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', newSort);
    setSearchParams(newParams);
  };

  const setSearch = (newSearch: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('search', newSearch);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const goToNextPage = (totalPages: number) => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

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
