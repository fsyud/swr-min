export type State<Data = any, Error = any> = {
  data?: Data;
  error?: Error;
  isValidating?: boolean;
  isLoading?: boolean;
};

export interface Cache<Data = any> {
  keys(): IterableIterator<string>;
  get(key: string): State<Data> | undefined;
  set(key: string, value: State<Data>): void;
  delete(key: string): void;
}
