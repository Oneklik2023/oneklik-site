'use client';

import React from 'react';
import Home from '../components/Home/Home';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      <Home />
    </div>
  );
};

export default HomePage;
