import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-extrabold text-base">
          <BookOpen className="w-5 h-5 text-indigo-400" /> BookVerse
        </div>
        <p className="text-xs text-slate-500">
          © 2026 BookVerse - Phiên bản giao diện người dùng, đăng nhập &amp; đăng ký cơ bản.
        </p>
      </div>
    </footer>
  );
};
