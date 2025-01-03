import { Outlet } from 'react-router-dom';
import Category from '../components/category/Category';
export default function CategoryLayout() {
  return (
    <div>
      <Category />
      <Outlet />
    </div>
  );
}
