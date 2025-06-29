export const getDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const durationInMs = end.getTime() - start.getTime();
  const durationInDays = durationInMs / (1000 * 60 * 60 * 24);

  return Math.ceil(durationInDays);
};

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
