import React, { useState } from 'react';
import { Plus, Trash2, Download, Eye, Clock } from 'lucide-react';
import Sidebar from './Sidebar';
import { mockPatients, mockFoodItems } from '../data/mockData';

type CurrentPage = 'login' | 'dashboard' | 'patient-profile' | 'food-database' | 'diet-builder' | 'reports' | 'mobile-patient';

interface DietChartBuilderProps {
  onNavigate: (page: CurrentPage) => void;
}

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  doshaEffect: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  items: MealItem[];
}

const DietChartBuilder: React.FC<DietChartBuilderProps> = ({ onNavigate }) => {
  const [selectedPatient, setSelectedPatient] = useState('Priya Sharma');
  const [chartTitle, setChartTitle] = useState('Weight Management Plan');
  const [duration, setDuration] = useState('4');
  const [showFoodSelector, setShowFoodSelector] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '8:00 AM',
      items: [
        { id: '1', name: 'Oats Porridge', quantity: '1 bowl', calories: 150, doshaEffect: 'Tridoshic' }
      ]
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '1:00 PM',
      items: [
        { id: '3', name: 'Basmati Rice', quantity: '1 cup', calories: 200, doshaEffect: 'Tridoshic' }
      ]
    },
    {
      id: 'snack',
      name: 'Evening Snack',
      time: '5:00 PM',
      items: []
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:30 PM',
      items: [
        { id: '5', name: 'Moong Dal', quantity: '1 cup', calories: 180, doshaEffect: 'Tridoshic' }
      ]
    }
  ]);

  const patients = mockPatients.map(p => p.name);

  const totalCalories = meals.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0), 0
  );

  const doshaAnalysis = {
    vata: meals.flatMap(m => m.items).filter(i => i.doshaEffect.includes('Vata')).length,
    pitta: meals.flatMap(m => m.items).filter(i => i.doshaEffect.includes('Pitta')).length,
    kapha: meals.flatMap(m => m.items).filter(i => i.doshaEffect.includes('Kapha')).length,
    tridoshic: meals.flatMap(m => m.items).filter(i => i.doshaEffect === 'Tridoshic').length,
  };

  const addMealItem = (mealId: string) => {
    setShowFoodSelector(mealId);
  };

  const addFoodToMeal = (mealId: string, foodItem: any) => {
    const newItem: MealItem = {
      id: Date.now().toString(),
      name: foodItem.name,
      quantity: '1 serving',
      calories: Math.round(foodItem.calories / 4), // Approximate serving size
      doshaEffect: foodItem.doshaEffect
    };

    setMeals(meals.map(meal => 
      meal.id === mealId 
        ? { ...meal, items: [...meal.items, newItem] }
        : meal
    ));
    setShowFoodSelector(null);
  };

  const removeMealItem = (mealId: string, itemId: string) => {
    setMeals(meals.map(meal => 
      meal.id === mealId 
        ? { ...meal, items: meal.items.filter(item => item.id !== itemId) }
        : meal
    ));
  };

  const updateMealItem = (mealId: string, itemId: string, field: keyof MealItem, value: string | number) => {
    setMeals(meals.map(meal => 
      meal.id === mealId 
        ? { 
            ...meal, 
            items: meal.items.map(item => 
              item.id === itemId 
                ? { ...item, [field]: value }
                : item
            )
          }
        : meal
    ));
  };

  return (
    <div className="flex">
      <Sidebar 
        currentPage="diet-builder" 
        onNavigate={onNavigate} 
        onLogout={() => onNavigate('login')} 
      />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Diet Chart Builder</h1>
              <p className="text-gray-600">Create personalized Ayurvedic meal plans</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Download className="w-4 h-4 mr-2 inline" />
                Export PDF
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-stone-50">
            {/* Chart Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chart Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                  <select
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {patients.map(patient => (
                      <option key={patient} value={patient}>{patient}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
                  <input
                    type="text"
                    value={chartTitle}
                    onChange={(e) => setChartTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Meals */}
            <div className="space-y-6">
              {meals.map((meal) => (
                <div key={meal.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
                        <span className="text-sm text-gray-500">{meal.time}</span>
                      </div>
                      <button
                        onClick={() => addMealItem(meal.id)}
                        className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1 inline" />
                        Add Food
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {meal.items.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No food items added yet</p>
                        <button
                          onClick={() => addMealItem(meal.id)}
                          className="mt-2 text-green-600 hover:text-green-700"
                        >
                          Add your first item
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {meal.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => updateMealItem(meal.id, item.id, 'name', e.target.value)}
                                className="w-full font-medium text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0"
                                placeholder="Food item name"
                              />
                            </div>
                            <div className="w-32">
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => updateMealItem(meal.id, item.id, 'quantity', e.target.value)}
                                className="w-full text-sm text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Quantity"
                              />
                            </div>
                            <div className="w-24">
                              <input
                                type="number"
                                value={item.calories}
                                onChange={(e) => updateMealItem(meal.id, item.id, 'calories', parseInt(e.target.value))}
                                className="w-full text-sm text-gray-600 bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Cal"
                              />
                            </div>
                            <div className="w-32">
                              <select
                                value={item.doshaEffect}
                                onChange={(e) => updateMealItem(meal.id, item.id, 'doshaEffect', e.target.value)}
                                className="w-full text-sm bg-transparent border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              >
                                <option value="Tridoshic">Tridoshic</option>
                                <option value="Vata+">Vata+</option>
                                <option value="Pitta+">Pitta+</option>
                                <option value="Kapha+">Kapha+</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeMealItem(meal.id, item.id)}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Food Selector Modal */}
                    {showFoodSelector === meal.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Select Food Item</h3>
                            <button 
                              onClick={() => setShowFoodSelector(null)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {mockFoodItems.map((food) => (
                              <button
                                key={food.id}
                                onClick={() => addFoodToMeal(meal.id, food)}
                                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-gray-800">{food.name}</p>
                                    <p className="text-sm text-gray-600">{food.category} • {food.calories} cal/100g</p>
                                  </div>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    food.doshaEffect === 'Tridoshic' ? 'bg-green-100 text-green-700' :
                                    food.doshaEffect === 'Vata+' ? 'bg-purple-100 text-purple-700' :
                                    food.doshaEffect === 'Pitta+' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {food.doshaEffect}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Analysis Panel */}
          <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Nutritional Analysis</h3>

            {/* Total Calories */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{totalCalories}</p>
                <p className="text-sm text-green-600">Total Calories</p>
              </div>
            </div>

            {/* Dosha Analysis */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-4">Dosha Balance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600">Vata Balancing</span>
                  <span className="font-medium">{doshaAnalysis.vata} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600">Pitta Balancing</span>
                  <span className="font-medium">{doshaAnalysis.pitta} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-600">Kapha Balancing</span>
                  <span className="font-medium">{doshaAnalysis.kapha} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Tridoshic</span>
                  <span className="font-medium">{doshaAnalysis.tridoshic} items</span>
                </div>
              </div>
            </div>

            {/* Ayurvedic Insights */}
            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-800 mb-3">Ayurvedic Insights</h4>
              <div className="space-y-2 text-sm text-amber-700">
                <p>• Good balance of tridoshic foods</p>
                <p>• Consider adding more cooling foods for Pitta</p>
                <p>• Include digestive spices with meals</p>
                <p>• Timing aligns with natural rhythms</p>
              </div>
            </div>

            {/* Diet Guidelines */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-3">Diet Guidelines</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• Eat largest meal at midday</p>
                <p>• Allow 3-4 hours between meals</p>
                <p>• Drink warm water throughout day</p>
                <p>• Finish dinner before sunset</p>
                <p>• Practice mindful eating</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DietChartBuilder;