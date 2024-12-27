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
      clearUser: () =>
        set((state) => ({
          user: state.user
            ? {
                email: state.user.email, // 이메일만 유지
                name: '',
                nickname: '',
                phone: '',
                role: '',
                company_name: undefined,
                workshop_name: undefined,
              }
            : null,
        })),
    }),
    {
      name: 'user', // 로컬스토리지 키
    }
  )
);

export default useUserStore;
