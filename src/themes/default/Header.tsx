import React from 'react';
import { Metadata } from '../../interfaces/resume-data.interface';

const Header: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <header className="mb-10">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full"
          src="https://avatar.tobi.sh/"
          alt={metadata?.name ?? 'Your Name'}
          width="30"
          height="30"
        />
        <h1 className="text-2xl font-bold">{metadata?.name ?? 'Your Name'}</h1>
      </div>
      <p className="mt-4">
        Full stack developer working with Web technologies. Loves to build highly scalable and maintainable web
        applications and back-ends. Currently focusing on Angular, React and Node.
      </p>
    </header>
  );
};

export default Header;
