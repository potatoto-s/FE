import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

Outlet;
export default function Layout() {
  return (
    <div>
      <div className="mb-[6.25rem]">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
