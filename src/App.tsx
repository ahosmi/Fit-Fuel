import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExercisePage from './pages/ExercisePage';
import NutritionPage from './pages/NutritionPage';
import CalculatorPage from './pages/CalculatorPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exercises" element={<ExercisePage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;