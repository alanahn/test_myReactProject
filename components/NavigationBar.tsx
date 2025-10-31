import React from 'react';
import { WebsiteCategory } from '../types';

type Category = WebsiteCategory | 'All';

interface NavigationBarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'All', label: '전체' },
  { id: '게임', label: '게임' },
  { id: 'MBTI', label: 'MBTI' },
];

const NavigationBar: React.FC<NavigationBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-current={activeCategory === category.id ? 'page' : undefined}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
