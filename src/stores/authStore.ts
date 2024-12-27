import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => {
        set({ accessToken: null }); // Zustand 상태에서 accessToken 삭제
        localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 refreshToken 삭제
        localStorage.removeItem('auth'); // Zustand persist 데이터 전체 삭제
      },
    }),
    {
      name: 'auth', // persist된 데이터의 키
    }
  )
);

export default useAuthStore;
