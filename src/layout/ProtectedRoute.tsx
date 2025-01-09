import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../stores/userStore';

// WorkshopRoutes: 워크숍 사용자 접근 가능
export function WorkshopRoutes() {
  const { user } = useUserStore();
  const isWorkShopUser = user && user.role === 'WORKSHOP'; // 워크숍 사용자 확인

  return isWorkShopUser ? <Outlet /> : <Navigate to="/community" replace />;
}

// LoginRoutes: 로그인 상태 접근 가능
export function LoginRoutes() {
  const { user } = useUserStore();
  const isLogIn = !!user; // 유저가 로그인 상태인지 확인

  return isLogIn ? <Outlet /> : <Navigate to="/" replace />;
}

// PublicRoutes: 비로그인 상태 접근 가능
export function PublicRoutes() {
  const { user } = useUserStore();
  const isLogIn = !!user; // 유저가 로그인 상태인지 확인

  return !isLogIn ? <Outlet /> : <Navigate to="/" replace />;
}
