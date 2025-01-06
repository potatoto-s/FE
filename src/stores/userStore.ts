import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    email: string;
    name: string;
    nickname: string;
    phone: string;
    role: string;
    company_name?: string;
    workshop_name?: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }), // user 전체 초기화
    }),
    {
      name: 'user', // 로컬스토리지 키
    }
  )
);

export default useUserStore;
