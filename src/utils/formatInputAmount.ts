export const formatInputAmount = (inputAmount: string): string => {
  let formattedAmount = inputAmount.replace(/[^0-9.]/g, '');
  formattedAmount = formattedAmount.replace(/(\..*)\./g, '$1');
  formattedAmount = formattedAmount.replace(/^0+/, '0');

  if (/^\./.test(formattedAmount)) {
    formattedAmount = formattedAmount.substring(1);
  }

  return formattedAmount;
};
