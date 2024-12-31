import React, { useState } from 'react';

type Category = {
  id: string;
  label: string;
};

const categories: Category[] = [
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

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="w-[1300px] h-[80px] flex items-center justify-between border-t-2 border-b-2 border-[#F0F0F0] bg-[#FFF] mx-auto">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`text-[20px] font-medium leading-normal tracking-[1.2px] px-4 focus:outline-none transition-colors duration-200
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
  );
};

export default Category;
