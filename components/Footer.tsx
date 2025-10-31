import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {currentYear} 기로뇽뇽. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          학교 주소: 경기 분당구 하오개로 351번길 4
        </p>
      </div>
    </footer>
  );
};

export default Footer;