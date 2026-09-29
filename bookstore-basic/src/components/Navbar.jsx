import React from 'react';
import { BookOpen, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Book<span className="text-indigo-600">Verse</span>
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trang Chủ
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate hidden sm:inline">
                  {user.user_metadata?.full_name || user.email.split('@')[0]}
                </span>
              </div>

              <button
                onClick={signOut}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Đăng Xuất</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  currentPage === 'login'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập</span>
              </button>

              <button
                onClick={() => onNavigate('register')}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>Đăng Ký</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
