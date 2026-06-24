import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-[#fcfcfc] font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-[#eee] bg-gray-50 flex flex-col shrink-0 hidden sm:flex">
          <nav className="mt-4 flex-1">
            <NavLink to="/" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>Dashboard Overview</NavLink>
            <NavLink to="/register" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>Student Registration</NavLink>
            <NavLink to="/students" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>View Student List</NavLink>
          </nav>
          <div className="p-4 border-t border-[#eee] text-[10px] text-gray-500 uppercase">
            System Version: 1.0.4-STABLE<br />
            Logged In As: ADMIN_JS
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
