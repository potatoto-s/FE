import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  role: string;
  company_name?: string;
  workshop_name?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'user', // 로컬스토리지 키
    }
  )
);

export default useUserStore;
