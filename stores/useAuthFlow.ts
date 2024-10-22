import { create } from 'zustand';

interface IAuthFlowStore {
  redirectAfterOTPConfirm: 'home' | 'sign-up-password-add' | undefined;
  signUp: {
    phoneNumber: string;
    password: string;
  };
  signIn: {
    user: string;
    password: string;
  };
  signInFlowStart: (user: string, password: string) => void;
  signUpFlowStart: (phoneNumber: string) => void;
  signUpFlowConfirmOTP: (password: string) => void;
}

const useAuthFlowStore = create<IAuthFlowStore>()((set) => ({
  redirectAfterOTPConfirm: undefined,
  signUp: {
    phoneNumber: '',
    password: '',
  },
  signIn: {
    user: '',
    password: '',
  },
  signInFlowStart: (user, password) => {
    set({ signIn: { user, password } });
  },
  signUpFlowStart: (phoneNumber) => {
    set({ signUp: { phoneNumber, password: '' } });
  },
  signUpFlowConfirmOTP: (password) => {
    set((n) => ({ signUp: { ...n.signUp, password } }));
  },
}));

export default useAuthFlowStore;
export type { IAuthFlowStore };
