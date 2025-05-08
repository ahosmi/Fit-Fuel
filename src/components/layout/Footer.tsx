import React from 'react';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} FitFuel</span>
            <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>
            <span className="flex items-center text-gray-600 dark:text-gray-300">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> By Ahosmi
            </span>
          </div>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;