import React, { useState } from 'react';
import { Search, Filter, Plus, Eye } from 'lucide-react';
import Sidebar from './Sidebar';
import { mockFoodItems } from '../data/mockData';

type CurrentPage = 'login' | 'dashboard' | 'patient-profile' | 'food-database' | 'diet-builder' | 'reports' | 'mobile-patient';

interface FoodDatabaseProps {
  onNavigate: (page: CurrentPage) => void;
}

const FoodDatabase: React.FC<FoodDatabaseProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDosha, setSelectedDosha] = useState('All');

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Legumes', 'Dairy', 'Oils'];
  const doshas = ['All', 'Vata+', 'Pitta+', 'Kapha+', 'Tridoshic'];


  const filteredFoods = mockFoodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesDosha = selectedDosha === 'All' || food.doshaEffect === selectedDosha;
    return matchesSearch && matchesCategory && matchesDosha;
  });

  return (
    <div className="flex">
      <Sidebar 
        currentPage="food-database" 
        onNavigate={onNavigate} 
        onLogout={() => onNavigate('login')} 
      />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Food Database</h1>
              <p className="text-gray-600">Comprehensive Ayurvedic nutrition database</p>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2 inline" />
              Add Food Item
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap items-center space-x-4 space-y-2 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Dosha Filter */}
            <select
              value={selectedDosha}
              onChange={(e) => setSelectedDosha(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {doshas.map(dosha => (
                <option key={dosha} value={dosha}>{dosha}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Food Items Grid */}
        <main className="p-6 overflow-y-auto bg-stone-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Food Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {food.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{food.calories} cal/100g</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      food.doshaEffect === 'Tridoshic' ? 'bg-green-100 text-green-700' :
                      food.doshaEffect === 'Vata+' ? 'bg-purple-100 text-purple-700' :
                      food.doshaEffect === 'Pitta+' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {food.doshaEffect}
                    </span>
                  </div>
                </div>

                {/* Nutrition Facts */}
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">Nutrition (per 100g)</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-medium">{food.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-medium">{food.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fat:</span>
                      <span className="font-medium">{food.fat}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fiber:</span>
                      <span className="font-medium">{food.fiber}g</span>
                    </div>
                  </div>
                </div>

                {/* Ayurvedic Properties */}
                <div className="p-4">
                  <h4 className="font-medium text-amber-700 mb-3">Ayurvedic Properties</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rasa:</span>
                      <span className="font-medium text-amber-600">{food.rasa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Virya:</span>
                      <span className="font-medium text-amber-600">{food.virya}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vipaka:</span>
                      <span className="font-medium text-amber-600">{food.vipaka}</span>
                    </div>
                  </div>
                  
                  {/* Properties Tags */}
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {food.properties.slice(0, 2).map((prop, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                          {prop}
                        </span>
                      ))}
                      {food.properties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{food.properties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ayurvedic Note */}
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                    <p className="text-xs text-amber-800">{food.ayurvedicNote}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-200 flex space-x-2">
                  <button 
                    onClick={() => onNavigate('diet-builder')}
                    className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                  >
                    Add to Diet
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No food items found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FoodDatabase;