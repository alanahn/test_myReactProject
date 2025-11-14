import React from 'react';
import { Website } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { Link } from 'react-router-dom'; // <a> 대신 Link를 import 합니다.

interface WebsiteCardProps {
  website: Website;
  onEdit: () => void;
  onDelete: () => void;
}

const categoryColors: { [key: string]: string } = {
  '게임': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'MBTI': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onEdit, onDelete }) => {
  // 버튼 클릭 시 링크 이동을 막기 위한 핸들러
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault(); // <a> 태그의 기본 동작(링크 이동)을 막습니다.
    e.stopPropagation(); // 이벤트가 부모 요소로 전파되는 것을 막습니다.
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // <a> 태그의 기본 동작(링크 이동)을 막습니다.
    e.stopPropagation(); // 이벤트가 부모 요소로 전파되는 것을 막습니다.
    onDelete();
  };

  return (
    // 카드를 a 태그로 감싸 링크로 만듭니다.
    <Link
      to={website.path} // website 데이터에 추가한 path 속성을 사용합니다.
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex flex-col h-full">
        <img className="w-full h-56 object-cover" src={website.imageUrl} alt={website.title} />
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{website.title}</h3>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[website.category] || ''}`}>
              {website.category}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 flex-grow">{website.description}</p>
          <div className="mt-6 flex justify-end items-center gap-4">
            <button
              onClick={handleEditClick} // 수정된 클릭 핸들러를 연결합니다.
              className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10" // z-10 추가로 다른 요소에 가려지지 않게 함
              aria-label="Edit website"
            >
              <PencilIcon />
            </button>
            <button
              onClick={handleDeleteClick} // 수정된 클릭 핸들러를 연결합니다.
              className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Delete website"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WebsiteCard;