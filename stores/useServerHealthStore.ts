import { create } from "zustand";

interface ServerHealthState {
  isHealthy: boolean;
  setHealth: (isHealthy: boolean) => void;
}

export const useServerHealthStore = create<ServerHealthState>((set) => ({
  isHealthy: true, // Default to true initially
  setHealth: (isHealthy) => set({ isHealthy }),
}));
