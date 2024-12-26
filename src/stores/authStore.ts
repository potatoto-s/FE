import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => {
    set({ accessToken: null });
    localStorage.removeItem('refreshToken');
  },
}));

export default useAuthStore;
