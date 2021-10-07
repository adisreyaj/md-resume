import React from 'react';
import { Metadata } from '../../interfaces/resume-data.interface';

const Header: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <header className="mb-10">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold">{metadata?.name ?? 'Your Name'}</h1>
      </div>
      <p className="mt-4">{metadata?.description}</p>
    </header>
  );
};

export default Header;
