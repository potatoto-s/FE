import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-[6.25rem]">
        <Header />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
