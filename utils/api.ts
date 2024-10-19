import { IResponse } from '@/types/response';
import { TRequest } from '@/types/request';
import { API_URL } from '@/utils/const';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

async function buildURL(path: TRequest['path'], queryParams?: TRequest['queryParams']) {
  const url = new URL(path, API_URL);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, JSON.stringify(value));
    });
  }

  return url.toString();
}

export default async function request<TResponseData>(
  request: TRequest
): Promise<IResponse<TResponseData>> {
  const body = request.body ? JSON.stringify(request.body) : undefined;
  const headers = { ...defaultHeaders, ...request.headers };
  const url = await buildURL(request.path, request.queryParams);

  const httpResponse = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const response = (await httpResponse.json()) as TResponseData;

  return {
    data: response,
    status: httpResponse.status,
    statusText: httpResponse.statusText,
  };
}
