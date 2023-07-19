export type ChangeTypes<T, P> = {
  [K in keyof T]: P;
};