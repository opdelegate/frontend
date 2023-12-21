import exp from "constants";

export const formatNumber = (n: number) => {
  return (
    n?.toLocaleString(
      // undefined,
      'en-US',
      // leave undefined to use the visitor's browser
      // locale or a string like 'en-US' to override it.
      // { minimumFractionDigits: 2 },
    ) ?? ''
  );
};

export const formatAddress = (a: string) => {
  return `${a.substring(0, 4)}...${a.substring(a.length - 4, a.length)}`;
};

export const formatDate = (
  unformattedDate: string | number,
  options: Intl.DateTimeFormatOptions = {
    weekday: undefined,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
) => {
  // const options = {
  //   weekday: undefined,
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }
  if (!unformattedDate) return '-';
  if (typeof unformattedDate === 'number')
    return new Date(unformattedDate).toLocaleDateString('en-US', options);
  else {
    const containsOnlyNumbers = /^\d+$/.test(unformattedDate);
    let a: any;
    if (containsOnlyNumbers) a = +unformattedDate;
    else a = unformattedDate;
    return new Date(a).toLocaleDateString('en-US', options);
  }
};

export const calculatePercentage = (n: number) => {
  return `${(n * 100).toFixed(3)}%`;
}
