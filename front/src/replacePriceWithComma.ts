/**
 * @author lxxjn0
 */

export const insertComma = (price: string) => {
  const insertCommaRegExp = /\B(?=(\d{3})+(?!\d))/g;
  return price.replace(insertCommaRegExp, ",");
};

export const removeComma = (price: string) => {
  const removeCommaRegExp = /[^\d]+/g;
  return price.replace(removeCommaRegExp, "");
};
