import { query } from "@/utils/api";
import { ServerNotHealthyError } from "@/errors/api";
import { TStatusCode } from "@/types/response";

export default async function checkIsServerHealthy(): Promise<TStatusCode> {
  const response = await query("test");

  if (response.status !== 200) {
    throw new ServerNotHealthyError(
      `Server health check failed: Status ${response.status} ${response.statusText}`
    );
  }

  return response.status;
}
