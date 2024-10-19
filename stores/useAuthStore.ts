import { create } from 'zustand';

import { clearSession, getSession, setSession } from '@/utils/session';
import { TSession } from '@/types/session';

interface IAuthStore {
  session: TSession | null;
  setSession: (session: TSession) => void;
  clearSession: () => void;
}

const useAuthStore = create<IAuthStore>()((set) => ({
  session: getSession(),
  setSession: (session) => {
    setSession(session);
    set({ session });
  },
  clearSession: () => {
    clearSession().then(() => {
      set({ session: null });
    });
  },
}));

export default useAuthStore;
export type { IAuthStore };
