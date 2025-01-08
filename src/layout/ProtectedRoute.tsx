import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../stores/userStore';

// WorkshopRoutes: 워크숍 사용자 확인
export function WorkshopRoutes() {
  const { user } = useUserStore();
  const isWorkShopUser = user && user.role === 'WORKSHOP'; // 워크숍 사용자 확인

  return isWorkShopUser ? <Outlet /> : <Navigate to="/community" replace />;
}
