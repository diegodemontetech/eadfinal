import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <Sidebar />
      <main className="ml-[72px] pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;