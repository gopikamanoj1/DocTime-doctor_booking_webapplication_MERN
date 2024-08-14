export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };
  