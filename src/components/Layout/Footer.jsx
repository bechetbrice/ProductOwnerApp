import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-4 sm:py-5 md:py-6 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {/* Logo with gradient background */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 p-2 rounded-lg shadow-md">
            <img 
              src="/productownerapp_logo.png" 
              alt="ProductOwnerApp Logo" 
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          </div>
          
          {/* App name with gradient */}
          <p className="text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            ProductOwnerApp
          </p>
          
          {/* Separator - Hidden on mobile */}
          <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
          
          {/* Copyright with gradient */}
          <p className="text-xs bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent text-center">
            © {currentYear} ProductOwnerApp. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
