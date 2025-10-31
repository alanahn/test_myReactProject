import React from 'react';
import { Website } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
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
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit website"
          >
            <PencilIcon />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete website"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCard;