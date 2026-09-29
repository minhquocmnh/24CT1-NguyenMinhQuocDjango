import React, { useState } from 'react';
import { Search, Star, BookOpen, Eye, X, CheckCircle, ArrowRight } from 'lucide-react';
import { BOOKS_DATA } from '../services/mockData';

export const HomePage = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedBook, setSelectedBook] = useState(null);

  const categories = ['Tất cả', 'Công nghệ', 'Kinh tế', 'Văn học', 'Kỹ năng sống', 'Thiếu nhi'];

  // Lọc sách theo từ khóa tìm kiếm và thể loại
  const filteredBooks = BOOKS_DATA.filter((book) => {
    const matchesCategory = selectedCategory === 'Tất cả' || book.category === selectedCategory;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="flex-1 pb-16">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              Khám phá tri thức cùng BookVerse
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Mở Trang Sách Mới, <br className="hidden sm:inline" />
              <span className="text-indigo-400">Khám Phá Thế Giới Mới</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Nhà sách trực tuyến với hàng ngàn đầu sách chọn lọc từ kinh tế, lập trình công nghệ, văn học đến kỹ năng sống cho mọi độc giả.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4 shadow-xl">
              <img 
                src="/images/dac-nhan-tam.jpg" 
                alt="Book" 
                className="w-16 h-24 object-cover rounded-xl shadow-md" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'; }}
              />
              <div className="text-left">
                <span className="text-xs text-indigo-300 font-bold">Sách bán chạy</span>
                <h4 className="font-bold text-sm text-white max-w-[160px] truncate">Đắc Nhân Tâm</h4>
                <p className="text-xs text-slate-300">Dale Carnegie</p>
                <span className="text-indigo-400 font-extrabold text-sm block mt-1">89.000 ₫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Thanh tìm kiếm & Lọc thể loại */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sách theo tên cuốn sách hoặc tên tác giả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-2">Thể loại:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Danh sách hiển thị Sách */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Danh Mục Sách ({filteredBooks.length})
          </h2>
          <span className="text-xs text-slate-500">
            Đang lọc: <strong>{selectedCategory}</strong>
          </span>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <BookOpen className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Không tìm thấy sách phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn lọc.</p>
            <button
              onClick={() => { setSelectedCategory('Tất cả'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-xl text-xs hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              Xem tất cả sách
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {filteredBooks.map((book) => {
              const discountPercent = book.sale_price
                ? Math.round(((book.price - book.sale_price) / book.price) * 100)
                : 0;

              return (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {book.category}
                    </span>

                    {discountPercent > 0 && (
                      <span className="absolute top-2.5 right-2.5 bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Information */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{book.rating || 4.8}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                        {book.title}
                      </h3>

                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {book.author}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-extrabold text-indigo-600">
                          {formatPrice(book.sale_price || book.price)}
                        </div>
                        {book.sale_price && (
                          <div className="text-[10px] text-slate-400 line-through">
                            {formatPrice(book.price)}
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedBook(book); }}
                        className="p-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Modal Xem Chi Tiết Sách */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-start">
              <img
                src={selectedBook.cover_url}
                alt={selectedBook.title}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'; }}
                className="w-24 h-36 object-cover rounded-xl shadow-md shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-md">
                  {selectedBook.category}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {selectedBook.title}
                </h3>
                <p className="text-xs text-slate-500">Tác giả: <strong>{selectedBook.author}</strong></p>
                <div className="text-base font-extrabold text-indigo-600 pt-1">
                  {formatPrice(selectedBook.sale_price || selectedBook.price)}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mô tả sách</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedBook.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
