import { API_URL } from "@/utils/const";
import ky, { KyResponse, Options } from "ky";
import { ApiMetadata, ApiRoutes } from "@/utils/endpoints";

type RequestOptions = Omit<Options, "method" | "body" | "json"> & {
  noParse?: boolean;
};

async function buildURL(path: string): Promise<string> {
  const url = new URL(path, API_URL);
  return url.toString();
}

// Helper function to check if the method is allowed for the given path
function checkMethodAllowed(path: ApiRoutes, method: string) {
  if (!ApiMetadata[path].methods.includes(method)) {
    console.error(`Method ${method} is not allowed for ${path}`);
    throw new Error(`Method ${method} is not allowed for ${path}`);
  }
}

// Helper function to handle response parsing
async function handleResponse<TResponseData>(
  response: KyResponse,
  options?: RequestOptions
): Promise<{ data: TResponseData; response: KyResponse }> {
  if (!options?.noParse) {
    return {
      data: await response.json<TResponseData>(),
      response,
    };
  }
  return {
    data: (await response.text()) as TResponseData,
    response,
  };
}

async function query<TResponseData>(
  path: ApiRoutes,
  queryParams?: Record<string, string | number | boolean>,
  options?: RequestOptions
) {
  checkMethodAllowed(path, "GET");

  const url = await buildURL(path);

  const response = await ky.get<TResponseData>(url, {
    ...options,
    searchParams: queryParams,
  });

  return handleResponse<TResponseData>(response, options);
}

async function mutate<TResponseData>(
  path: ApiRoutes,
  method: "POST" | "PUT" | "DELETE",
  body: object,
  options?: RequestOptions
) {
  checkMethodAllowed(path, method);

  const url = await buildURL(path);

  const response = await ky(url, {
    ...options,
    method,
    json: body,
  });

  return handleResponse<TResponseData>(response, options);
}

export { query, mutate };
