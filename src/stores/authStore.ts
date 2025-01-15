import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserStore from '@stores/userStore';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),

      logout: () => {
        useUserStore.getState().clearUser();
        set({ accessToken: null, refreshToken: null });
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
      },
    }),
    {
      name: 'auth', // persist된 데이터의 키
    }
  )
);

export default useAuthStore;
