export const truncateString = (str, num) => {
  const address = `${str?.substring(0, num)}...${str?.substring(str.length - num)}`;
  return address;
};
