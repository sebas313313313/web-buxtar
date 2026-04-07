import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 mt-auto bg-gray-50/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-400">
        <div className="mb-4 md:mb-0">
          &copy; 2026 <a href="https://buxtar.co/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-vino transition-colors font-bold">Buxtar</a>
        </div>
        <div className="flex space-x-6">
          <button className="hover:text-brand-vino transition-colors">Team</button>
          <button className="hover:text-brand-vino transition-colors">Acerca de</button>
          <button className="hover:text-brand-vino transition-colors">Blog</button>
          <button className="hover:text-brand-vino transition-colors">Licencia</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
