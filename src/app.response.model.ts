export interface AppResponse<T> {
  code: string;
  errors: Array<any>;
  response: T;
}
