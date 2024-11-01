import * as SecureStore from "expo-secure-store";

import { TSession, sessionSchema } from "@/types/session";

const AUTH_STORE_KEY = "sb-auth-async";

export function getSession(): TSession | null {
  const sess = SecureStore.getItem(AUTH_STORE_KEY);
  const { data, success } = sessionSchema.safeParse(sess);

  if (success) {
    return data as TSession;
  }
  // @TODO implement error posthog stats idk
  return null;
}

export function setSession(session: TSession) {
  const { data, success } = sessionSchema.safeParse(session);

  if (!success) {
    throw new Error("Invalid session");
  }

  SecureStore.setItem(AUTH_STORE_KEY, JSON.stringify(data), {
    keychainAccessible: SecureStore.WHEN_UNLOCKED,
  });
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(AUTH_STORE_KEY);
}
