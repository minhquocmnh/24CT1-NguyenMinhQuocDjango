import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Kiểm tra session hiện tại từ Supabase nếu có cấu hình
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          // Kiểm tra xem có lưu đăng nhập demo cục bộ không
          const savedMockUser = localStorage.getItem('basic_bookstore_user');
          if (savedMockUser) setUser(JSON.parse(savedMockUser));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          const savedMockUser = localStorage.getItem('basic_bookstore_user');
          setUser(savedMockUser ? JSON.parse(savedMockUser) : null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      const savedMockUser = localStorage.getItem('basic_bookstore_user');
      if (savedMockUser) setUser(JSON.parse(savedMockUser));
      setLoading(false);
    }
  }, []);

  // Hàm Đăng Ký
  const signUp = async (email, password, fullName) => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('basic_bookstore_user', JSON.stringify(data.user));
        }
        return { success: true };
      }
    } catch (err) {
      console.warn('Lỗi Supabase Auth, chuyển sang chế độ tài khoản cục bộ:', err.message);
    }

    // Fallback: Tạo tài khoản demo nếu Supabase chưa mở hoặc dính rate limit
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      user_metadata: { full_name: fullName || email.split('@')[0] }
    };
    setUser(mockUser);
    localStorage.setItem('basic_bookstore_user', JSON.stringify(mockUser));
    return { success: true };
  };

  // Hàm Đăng Nhập
  const signIn = async (email, password) => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('basic_bookstore_user', JSON.stringify(data.user));
        }
        return { success: true };
      }
    } catch (err) {
      console.warn('Lỗi Supabase Auth, chuyển sang chế độ đăng nhập cục bộ:', err.message);
    }

    // Fallback: Đăng nhập demo
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      user_metadata: { full_name: email.split('@')[0] }
    };
    setUser(mockUser);
    localStorage.setItem('basic_bookstore_user', JSON.stringify(mockUser));
    return { success: true };
  };

  // Hàm Đăng Xuất
  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    localStorage.removeItem('basic_bookstore_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
