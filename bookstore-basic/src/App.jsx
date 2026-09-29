import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const MainApp = () => {
  // Quản lý trang hiển thị: 'home' (Trang chủ), 'login' (Đăng nhập), 'register' (Đăng ký)
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 1. Header Navigation */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* 2. Nội dung trang theo từng file riêng biệt */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage onNavigate={setCurrentPage} />}
      </main>

      {/* 3. Chân trang */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
