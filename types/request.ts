// Meta information about the request headers, omitting 'Accept' and 'Content-Type'
type CommonHttpHeaders = {
  Accept?: string;
  "Accept-Charset"?: string;
  "Accept-Encoding"?: string;
  "Accept-Language"?: string;
  Authorization?: string;
  "Cache-Control"?: string;
  Connection?: string;
  "Content-Length"?: string;
  "Content-Type"?: string;
  Cookie?: string;
  Date?: string;
  Expect?: string;
  Host?: string;
  "If-Match"?: string;
  "If-Modified-Since"?: string;
  "If-None-Match"?: string;
  "If-Range"?: string;
  "If-Unmodified-Since"?: string;
  "Keep-Alive"?: string;
  "Last-Modified"?: string;
  Origin?: string;
  Pragma?: string;
  Range?: string;
  Referer?: string;
  "Transfer-Encoding"?: string;
  Upgrade?: string;
  "User-Agent"?: string;
  Via?: string;
  Warning?: string;
  "X-Forwarded-For"?: string;
  "X-Forwarded-Host"?: string;
  "X-Forwarded-Proto"?: string;
  "X-Frame-Options"?: string;
  "X-Requested-With"?: string;
  "X-XSS-Protection"?: string;
  [key: string]: string | undefined;
};

type THeaders = Omit<CommonHttpHeaders, "Accept" | "Content-Type">;

// Interface for request metadata including path and headers
export interface IRequestMeta {
  path: string;
  headers?: THeaders;
}

// Conditional types for defining the type of the body based on the request method
export type TRequestBodyWithBody = object;

// Type definition for query parameters in a URL
export type QueryParams = Record<string, string | number | boolean>;

// Interface for defining the structure of requests without body
export interface IRequestWithoutBody extends IRequestMeta {
  queryParams?: QueryParams;
}

// Interface for defining the structure of requests with body
export interface IRequestWithBody extends IRequestMeta {
  method: "POST" | "PUT" | "DELETE";
  body: TRequestBodyWithBody;
  queryParams?: QueryParams;
}

// Type alias to simplify usage of request types without specifying the method explicitly
export type TRequest = IRequestWithoutBody | IRequestWithBody;
