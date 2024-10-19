import useAuthStore from '@/stores/useAuthStore';
import { TRequest } from '@/types/request';
import { IResponse } from '@/types/response';
import request from '@/utils/api';

interface NotAuthenticated extends IResponse<undefined> {
  notAuthenticated: true;
}

export default function useApi() {
  const auth = useAuthStore();

  const r = request;

  async function ar<TResponseData>(
    builder: TRequest
  ): Promise<IResponse<TResponseData> | NotAuthenticated> {
    const authHeaders = auth.session ? { Authorization: `Bearer ${auth.session.sessionId}` } : {};
    const headers = { ...builder.headers, ...authHeaders };

    return await r<TResponseData>({ ...builder, headers });
  }

  return {
    request: r,
    authRequest: ar,
  };
}
