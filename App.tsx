import React, { useState, useMemo, useCallback } from 'react';
import { Website, WebsiteCategory } from './types';
import WebsiteCard from './components/WebsiteCard';
import Modal from './components/Modal';
import WebsiteForm from './components/WebsiteForm';
import { PlusIcon } from './components/icons/PlusIcon';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import './index.css';

const initialWebsites: Website[] = [
  {
    id: '1',
    title: 'My Portfolio',
    description: 'A personal portfolio showcasing my projects and skills in web development.',
    imageUrl: 'https://picsum.photos/seed/portfolio/600/400',
    category: 'MBTI',
  },
  {
    id: '2',
    title: 'Travel Blog',
    description: 'Documenting my adventures around the globe with stories and photography.',
    imageUrl: 'https://picsum.photos/seed/travel/600/400',
    category: '게임',
  },
  {
    id: '3',
    title: 'E-commerce Store',
    description: 'An online store selling handmade crafts and unique gifts.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/600/400',
    category: '게임',
  },
];

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [activeCategory, setActiveCategory] = useState<WebsiteCategory | 'All'>('All');

  const handleOpenCreateModal = useCallback(() => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingWebsite(null);
  }, []);

  const handleSaveWebsite = useCallback((websiteData: Omit<Website, 'id' | 'imageUrl'>) => {
    if (editingWebsite) {
      // Update existing website
      setWebsites(prev => 
        prev.map(w => 
          w.id === editingWebsite.id ? { ...editingWebsite, ...websiteData } : w
        )
      );
    } else {
      // Create new website
      const newWebsite: Website = {
        id: new Date().getTime().toString(),
        ...websiteData,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/600/400`,
      };
      setWebsites(prev => [newWebsite, ...prev]);
    }
    handleCloseModal();
  }, [editingWebsite, handleCloseModal]);

  const handleDeleteWebsite = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      setWebsites(prev => prev.filter(w => w.id !== id));
    }
  }, []);

  const filteredWebsites = useMemo(() => {
    if (activeCategory === 'All') {
      return websites;
    }
    return websites.filter(w => w.category === activeCategory);
  }, [websites, activeCategory]);

  return (
    <div className="app-container">
  <NavigationBar 
    activeCategory={activeCategory}
    onCategoryChange={setActiveCategory}
  />
  <main className="main-content">
    <div className="container">
      <header className="page-header">
        <div>
          <h1 className="main-title">나의 웹사이트</h1>
          <p className="subtitle">생성한 웹사이트 목록을 관리하세요.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="create-website-button"
        >
          <PlusIcon />
          새 웹사이트 만들기
        </button>
      </header>

      {filteredWebsites.length > 0 ? (
        <div className="website-grid">
          {filteredWebsites.map(website => (
            <WebsiteCard
              key={website.id}
              website={website}
              onEdit={() => handleOpenEditModal(website)}
              onDelete={() => handleDeleteWebsite(website.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-websites-placeholder">
          <h2 className="placeholder-title">웹사이트가 없습니다</h2>
          <p className="placeholder-text">
            {activeCategory === 'All' 
              ? '첫 번째 웹사이트를 만들어 시작하세요!' 
              : `'${activeCategory}' 카테고리에 해당하는 웹사이트가 없습니다.`}
          </p>
        </div>
      )}
    </div>
  </main>

  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
    <WebsiteForm
      initialData={editingWebsite}
      onSave={handleSaveWebsite}
      onClose={handleCloseModal}
    />
  </Modal>
  <Footer />
</div>
  );
};

export default App;