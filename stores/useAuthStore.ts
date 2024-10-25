import { create } from 'zustand';

import { TSession } from '@/types/session';
import { clearSession, getSession, setSession } from '@/utils/session';

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
