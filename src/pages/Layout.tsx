import React, { useState, useMemo, useCallback } from 'react';
import { Outlet } from 'react-router-dom'; // react-router-dom에서 Outlet을 가져옵니다.
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { Website, WebsiteCategory } from '../../types';

const Layout: React.FC = () => {
    // NavigationBar에 필요한 state가 있다면 App.tsx에서 props로 내려주어야 합니다.
    // 지금은 activeCategory가 HomePage에 있으므로 일단 간단하게 구현합니다.
    const [activeCategory, setActiveCategory] = useState<WebsiteCategory | 'All'>('All');

    return (
        <div className="app-container">
            <NavigationBar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <main className="main-content">
                <Outlet /> {/* 이 부분이 페이지 컴포넌트(HomePage, PortfolioPage 등)로 교체됩니다. */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;