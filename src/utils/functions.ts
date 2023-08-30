export const formatNumber = (n: number) => {
  return n.toLocaleString(
    // undefined,
    'en-US',
    // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    // { minimumFractionDigits: 2 },
  );
};
