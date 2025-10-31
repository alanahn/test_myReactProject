import React, { useState, useEffect } from 'react';
import { Website, WebsiteFormData, WebsiteCategory } from '../types';

interface WebsiteFormProps {
  initialData: Website | null;
  onSave: (data: WebsiteFormData) => void;
  onClose: () => void;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<WebsiteFormData>({
    title: '',
    description: '',
    category: '게임',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
      });
    } else {
      setFormData({ title: '', description: '', category: '게임' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {initialData ? '웹사이트 편집' : '새 웹사이트 만들기'}
      </h2>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          카테고리
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="게임">게임</option>
          <option value="MBTI">MBTI</option>
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default WebsiteForm;