import { query } from "@/utils/api";
import { ServerNotHealthyError } from "@/errors/api";
import { TStatusCode } from "@/types/response";
import { ApiRoutes } from "@/utils/endpoints";

export default async function checkIsServerHealthy(): Promise<TStatusCode> {
  const response = await query(ApiRoutes.Test, {}, { noParse: true });
  const status = response.response.status;
  if (status !== 200) {
    throw new ServerNotHealthyError(
      `Server health check failed: Status ${status} ${response.response.statusText}`
    );
  }

  return status;
}
