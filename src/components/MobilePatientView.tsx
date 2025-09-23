import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  User, 
  BarChart3, 
  Bell,
  Droplets,
  Activity,
  Moon,
  Apple,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  LogOut
} from 'lucide-react';
import { mockPatients } from '../data/mockData';

interface MobilePatientViewProps {
  onLogout: () => void;
}

const MobilePatientView: React.FC<MobilePatientViewProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'diet' | 'progress' | 'profile'>('home');
  const [waterIntake, setWaterIntake] = useState(6);
  const [bowelMovement, setBowelMovement] = useState(false);
  const [completedMeals, setCompletedMeals] = useState<number[]>([0, 1]);

  const currentPatient = mockPatients[0]; // Priya Sharma

  const todayMeals = [
    { time: '8:00 AM', meal: 'Breakfast', items: ['Oats Porridge', 'Almonds', 'Herbal Tea'] },
    { time: '1:00 PM', meal: 'Lunch', items: ['Basmati Rice', 'Moong Dal', 'Mixed Vegetables'] },
    { time: '5:00 PM', meal: 'Snack', items: ['Green Tea', 'Dates'] },
    { time: '7:30 PM', meal: 'Dinner', items: ['Roti', 'Sabzi', 'Buttermilk'] },
  ];

  const toggleMealCompletion = (index: number) => {
    if (completedMeals.includes(index)) {
      setCompletedMeals(completedMeals.filter(i => i !== index));
    } else {
      setCompletedMeals([...completedMeals, index]);
    }
  };

  const weekProgress = [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 4 },
    { day: 'Wed', completed: 3 },
    { day: 'Thu', completed: 4 },
    { day: 'Fri', completed: 2 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 0 },
  ];

  const ayurvedicTips = [
    "Drink warm water first thing in the morning to kindle digestive fire",
    "Eat your largest meal when the sun is highest (12-2 PM)",
    "Practice deep breathing for 5 minutes before meals",
    "End dinner 3 hours before bedtime for better sleep"
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">AyurDiet</h1>
              <p className="text-xs text-gray-500">Welcome, {currentPatient.name.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            {/* Daily Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Water Intake */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <button 
                    onClick={() => setWaterIntake(waterIntake + 1)}
                    className="p-1 bg-blue-100 rounded-full"
                  >
                    <Plus className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
                <p className="text-2xl font-bold text-gray-800">{waterIntake}</p>
                <p className="text-xs text-gray-500">glasses today</p>
                <div className="mt-2 flex space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded ${
                        i < waterIntake ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Bowel Movement */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <button 
                    onClick={() => setBowelMovement(!bowelMovement)}
                    className={`p-1 rounded-full ${bowelMovement ? 'bg-green-100' : 'bg-gray-100'}`}
                  >
                    {bowelMovement ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Circle className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                <p className="text-lg font-bold text-gray-800">{bowelMovement ? 'Done' : 'Pending'}</p>
                <p className="text-xs text-gray-500">bowel movement</p>
              </div>
            </div>

            {/* Today's Meals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Today's Diet Plan</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {todayMeals.map((meal, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          completedMeals.includes(index) ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {completedMeals.includes(index) ? 
                            <CheckCircle className="w-5 h-5 text-green-600" /> : 
                            <Clock className="w-5 h-5 text-gray-400" />
                          }
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-800">{meal.meal}</p>
                            <span className="text-xs text-gray-500">{meal.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {meal.items.map((item, i) => (
                              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMealCompletion(index)}
                        className={`p-2 rounded-full ${
                          completedMeals.includes(index) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {completedMeals.includes(index) ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ayurvedic Tip */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-2">Daily Ayurvedic Tip</h3>
              <p className="text-sm text-amber-700">{ayurvedicTips[0]}</p>
            </div>
          </div>
        )}

        {activeTab === 'diet' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Diet Plan</h2>
            <div className="space-y-4">
              {todayMeals.map((meal, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{meal.meal}</h3>
                    <span className="text-sm text-gray-500">{meal.time}</span>
                  </div>
                  <div className="space-y-2">
                    {meal.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <button className={`w-6 h-6 rounded-full ${
                          completedMeals.includes(index) ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
                        }`}>
                          {completedMeals.includes(index) && <CheckCircle className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Progress Tracking</h2>
            
            {/* Weekly Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Weekly Meal Completion</h3>
              <div className="grid grid-cols-7 gap-2">
                {weekProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                    <div className="flex flex-col space-y-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-6 rounded ${
                            i < day.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="text-xs text-green-600">-2kg</span>
                </div>
                <p className="text-xl font-bold text-gray-800">65 kg</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Energy</span>
                  <Moon className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-gray-800">8/10</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Symptoms Tracking */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Symptom Improvements</h3>
              <div className="space-y-3">
                {[
                  { symptom: 'Fatigue', improvement: 70 },
                  { symptom: 'Digestion', improvement: 85 },
                  { symptom: 'Sleep', improvement: 90 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{item.symptom}</span>
                      <span className="text-sm font-medium text-green-600">+{item.improvement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.improvement}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-medium text-green-700">
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{currentPatient.name}</h2>
              <p className="text-gray-600">{currentPatient.age} years • {currentPatient.constitution}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Health Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Weight</span>
                  <span className="font-medium">{currentPatient.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Weight</span>
                  <span className="font-medium">{currentPatient.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BMI</span>
                  <span className="font-medium">{currentPatient.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Constitution</span>
                  <span className="font-medium text-amber-600">{currentPatient.constitution}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Current Plan</h3>
              <div className="space-y-2">
                <p className="font-medium text-green-600">Weight Management Plan</p>
                <p className="text-sm text-gray-600">Duration: 4 weeks</p>
                <p className="text-sm text-gray-600">Started: January 15, 2024</p>
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">Progress: Excellent! You've reached your target weight.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'diet', label: 'Diet', icon: Calendar },
            { id: 'progress', label: 'Progress', icon: BarChart3 },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center py-3 px-2 transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobilePatientView;