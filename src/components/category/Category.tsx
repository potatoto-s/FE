import { useState } from 'react';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

function Category() {
  const categories = [
    { id: 'all', label: '전체' },
    { id: 'balloon', label: '풍선/페이퍼아트' },
    { id: 'gift', label: '선물포장/보자기' },
    { id: 'wood', label: '목공/도자기/가죽' },
    { id: 'resin', label: '레진/비즈공예' },
    { id: 'diffuser', label: '디퓨저/캔들/석고방향제' },
    { id: 'rattan', label: '라탄/마크라메' },
    { id: 'flower', label: '플라워' },
    { id: 'total', label: '토탈공예' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    setIsMenuOpen(false); // 카테고리 선택 시 메뉴 닫기
  };

  return (
    <div className="w-full bg-white border-t-2 border-b-2 border-[#F0F0F0]">
      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:flex w-[1300px] h-[80px] items-center justify-between mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-normal tracking-[1px] px-4 focus:outline-none transition-colors duration-200
              ${
                selectedCategory === category.id
                  ? 'text-[#F28749] border-b-2 border-[#F28749] pb-1'
                  : 'text-[#000]'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden px-4 py-2 flex items-center justify-between">
        <span className="text-[14px] font-bold text-[#F28749]">카테고리</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#F28749] text-2xl focus:outline-none"
        >
          {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-lg mx-4 mt-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`block w-full text-left px-4 py-2 text-[14px] font-medium leading-normal tracking-[1px] focus:outline-none transition-colors duration-200
                ${
                  selectedCategory === category.id
                    ? 'text-[#F28749] bg-[#FFF4E8]'
                    : 'text-[#000]'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
