export const formatNumber = (number) => {
  return String(number).length > 1 ? String(number) : `0${String(number)}`;
}
