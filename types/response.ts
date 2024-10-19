export type TStatusCode = number;
type TStatusText = string;
export interface IResponse<T> {
  data: T;
  status: TStatusCode;
  statusText: TStatusText;
}
