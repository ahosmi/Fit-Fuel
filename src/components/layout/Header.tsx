import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Moon, Sun, Dumbbell } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'text-white bg-blue-600 dark:bg-blue-700' 
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
              <Dumbbell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FitFuel</span>
            </NavLink>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/exercises" className={navLinkClass}>Exercises</NavLink>
            <NavLink to="/nutrition" className={navLinkClass}>Nutrition</NavLink>
            <NavLink to="/calculator" className={navLinkClass}>Calculator</NavLink>
            <button 
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/exercises" className={navLinkClass} onClick={closeMenu}>Exercises</NavLink>
          <NavLink to="/nutrition" className={navLinkClass} onClick={closeMenu}>Nutrition</NavLink>
          <NavLink to="/calculator" className={navLinkClass} onClick={closeMenu}>Calculator</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;