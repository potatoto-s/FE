import { create } from 'zustand';

interface AuthState {
  user: { id: number; email: string; nickname: string; role: string } | null;
  accessToken: string | null;
  setUser: (user: AuthState['user']) => void;
  setAccessToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useAuthStore;
