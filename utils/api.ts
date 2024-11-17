// import ky, { Options } from "ky";
//
// import { IRequestWithoutBody, IRequestWithBody } from "@/types/request";
// import { IResponse } from "@/types/response";
// import { API_URL } from "@/utils/const";
//
// const defaultHeaders = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   locale: "he",
// };
//

//
// export async function query<TResponseData>(
//   request: IRequestWithoutBody
// ): Promise<IResponse<TResponseData>> {
//   const headers = { ...defaultHeaders, ...request.headers };
//   const url = await buildURL(request);
//
//   const options: Options = {
//     headers: headers,
//     retry: 0,
//   };
//
//   const response = await ky.get(url, options);
//
//   return {
//     data: await response.json<TResponseData>(),
//     status: response.status,
//     statusText: response.statusText,
//   };
// }
//
// export async function mutate<TResponseData>(
//   request: IRequestWithBody
// ): Promise<IResponse<TResponseData>> {
//   const headers = { ...defaultHeaders, ...request.headers };
//   const url = await buildURL(request);
//
//   const options: Options = {
//     method: request.method,
//     headers: headers,
//     retry: 0,
//     // body: JSON.stringify(request.body),
//   };
//
//   const response = await ky(url, options);
//
//   return {
//     data: await response.json<TResponseData>(),
//     status: response.status,
//     statusText: response.statusText,
//   };
// }

import { API_URL } from "@/utils/const";
import ky, { Options } from "ky";

async function buildURL(path: string): Promise<string> {
  const url = new URL(path, API_URL);
  return url.toString();
}

export async function query<TResponseData>(
  path: string,
  queryParams?: Record<string, string | number | boolean>,
  options?: Omit<Options, "method" | "body" | "json" | "queryParams">
) {
  const url = await buildURL(path);

  return ky.get<TResponseData>(url, {
    ...options,
    searchParams: queryParams,
  });
}

export async function mutate<TResponseData>(
  path: string,
  method: "POST" | "PUT" | "DELETE",
  body: object,
  options?: Omit<Options, "method" | "body" | "json">
) {
  const url = await buildURL(path); // Build the URL  with the path and query parameters

  return ky<TResponseData>(url, {
    ...options,
    method,
    json: body,
  });
}
