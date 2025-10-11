export const getQueryParamHandler = (param: string): string | undefined => {
  return param?.split(" ").join("+");
};
