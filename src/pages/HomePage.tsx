import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Utensils, Calculator } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Body, Transform Your Life</h1>
            <p className="text-xl mb-8">Discover exercises, find nutritious recipes, and calculate your caloric needs - all in one place.</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/exercises" 
                className="inline-block bg-white text-blue-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                Explore Exercises
              </Link>
              <Link 
                to="/nutrition" 
                className="inline-block bg-transparent border-2 border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition duration-200"
              >
                Find Recipes
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need For Your Fitness Journey</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Dumbbell className="h-10 w-10 text-blue-600 dark:text-blue-400" />}
            title="Exercise Library"
            description="Access to over 1,300 exercises with detailed instructions, videos, and similar exercise suggestions."
            linkTo="/exercises"
            linkText="Find Exercises"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-green-600 dark:text-green-400" />}
            title="Nutrition & Recipes"
            description="Discover healthy, delicious recipes with detailed nutritional information and filtering by diet or fitness goals."
            linkTo="/nutrition"
            linkText="Browse Recipes"
          />
          <FeatureCard 
            icon={<Calculator className="h-10 w-10 text-orange-600 dark:text-orange-400" />}
            title="Calorie Calculator"
            description="Calculate your daily caloric needs based on your personal data and fitness goals."
            linkTo="/calculator"
            linkText="Calculate Needs"
          />
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Join Thousands of Satisfied Users</h2>
          <blockquote className="italic text-xl mb-8">
            "FitFuel has completely transformed my fitness journey. The exercise library is extensive, the recipes are delicious, and the calorie calculator helped me set realistic goals. Highly recommended!"
          </blockquote>
          <p className="font-medium">- Sarah J., Fitness Enthusiast</p>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Take the first step towards a healthier, stronger you with our comprehensive fitness and nutrition resources.
        </p>
        <Link 
          to="/exercises" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, linkTo, linkText }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Link 
        to={linkTo} 
        className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center"
      >
        {linkText} <span className="ml-1">→</span>
      </Link>
    </div>
  );
};

export default HomePage;