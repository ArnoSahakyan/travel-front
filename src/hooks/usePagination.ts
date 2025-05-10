import { useSearchParams } from 'react-router-dom';

export const usePagination = (defaultPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') || '', 10);
  const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : defaultPage;

  const setPage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const goToNextPage = (totalPages: number) => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    page,
    setPage,
    goToNextPage,
    goToPrevPage,
  };
};
