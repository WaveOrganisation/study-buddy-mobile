// Meta information about the request
type CommonHttpHeaders = {
  Accept?: string;
  'Accept-Charset'?: string;
  'Accept-Encoding'?: string;
  'Accept-Language'?: string;
  Authorization?: string;
  'Cache-Control'?: string;
  Connection?: string;
  'Content-Length'?: string;
  'Content-Type'?: string;
  Cookie?: string;
  Date?: string;
  Expect?: string;
  Host?: string;
  'If-Match'?: string;
  'If-Modified-Since'?: string;
  'If-None-Match'?: string;
  'If-Range'?: string;
  'If-Unmodified-Since'?: string;
  'Keep-Alive'?: string;
  'Last-Modified'?: string;
  Origin?: string;
  Pragma?: string;
  Range?: string;
  Referer?: string;
  'Transfer-Encoding'?: string;
  Upgrade?: string;
  'User-Agent'?: string;
  Via?: string;
  Warning?: string;
  'X-Forwarded-For'?: string;
  'X-Forwarded-Host'?: string;
  'X-Forwarded-Proto'?: string;
  'X-Frame-Options'?: string;
  'X-Requested-With'?: string;
  'X-XSS-Protection'?: string;
  [key: string]: string | undefined;
};

type THeaders = Omit<CommonHttpHeaders, 'Accept' | 'Content-Type'>;
export interface IRequestMeta {
  path: string;
  headers: THeaders;
}

// Possible request methods
export type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Conditional type for request body based on method
export type TRequestBody<M extends IRequestMethod> = M extends 'GET' ? undefined : object;

// A mapped type to infer the method from the object itself
export type TRequestMap = {
  GET: IRequest<'GET'>;
  POST: IRequest<'POST'>;
  PUT: IRequest<'PUT'>;
  DELETE: IRequest<'DELETE'>;
};

export type QueryParams = Record<string, string | number | boolean>;

// Main request interface with inferred method types
export interface IRequest<M extends IRequestMethod> extends IRequestMeta {
  method: M;
  body: TRequestBody<M>;
  queryParams?: QueryParams;
}

// Use this type to avoid specifying the method type manually
export type TRequest = TRequestMap[keyof TRequestMap];

const request: TRequest = {
  method: 'POST',
  path: '/courses',
  headers: {
    ngga: 'test',
  },
  body: {
    title: 'Test Course',
    description: 'Test Course Description',
    course_code: 'test-course-code',
  },
};
