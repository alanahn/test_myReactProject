import React, { useState, useMemo, useCallback } from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import './index.css';
import PortfolioPage from './src/pages/PortfolioPage';
import { PlusIcon } from './components/icons/PlusIcon';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './src/pages/HomePage';
import Layout from './src/pages/Layout';
// import TravelBlogPage from './src/pages/TravelBlogPage';
// import EcomStorePage from './src/pages/EcomStorePage';

const App: React.FC = () => {

  return (
      <BrowserRouter basename="/test_myReactProject">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Layout 컴포넌트를 사용하는 페이지들 */}
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          {/* <Route path="travel-blog" element={<TravelBlogPage />} /> */}
          {/* <Route path="ecommerce-store" element={<EcomStorePage />} /> */}
        </Route>
        {/* 만약 헤더/푸터가 없는 별도의 페이지가 있다면 여기에 추가합니다. */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;