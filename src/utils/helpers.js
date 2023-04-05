export const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
export const generateRandomId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
