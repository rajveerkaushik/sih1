import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Weight, 
  Activity, 
  FileText, 
  TrendingUp,
  Edit3,
  Plus,
  Download
} from 'lucide-react';
import Sidebar from './Sidebar';
import { mockPatients, mockDietCharts } from '../data/mockData';

type CurrentPage = 'login' | 'dashboard' | 'patient-profile' | 'food-database' | 'diet-builder' | 'reports' | 'mobile-patient';

interface PatientProfileProps {
  onNavigate: (page: CurrentPage) => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'diet-charts' | 'progress' | 'reports'>('profile');
  const [selectedPatientId, setSelectedPatientId] = useState('1');

  const patient = mockPatients.find(p => p.id === selectedPatientId) || mockPatients[0];
  const patientDietCharts = mockDietCharts.filter(chart => chart.patientId === selectedPatientId);


  const progressData = [
    { metric: 'Weight', current: '65 kg', previous: '68 kg', change: '-3 kg', trend: 'down' },
    { metric: 'BMI', current: '22.4', previous: '23.5', change: '-1.1', trend: 'down' },
    { metric: 'Energy Level', current: '8/10', previous: '6/10', change: '+2', trend: 'up' },
    { metric: 'Sleep Quality', current: '7/10', previous: '5/10', change: '+2', trend: 'up' },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'diet-charts', label: 'Diet Charts', icon: FileText },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: Activity },
  ];

  return (
    <div className="flex">
      <Sidebar 
        currentPage="patient-profile" 
        onNavigate={onNavigate} 
        onLogout={() => onNavigate('login')} 
      />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-green-700">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{patient.name}</h1>
                  <p className="text-gray-600">{patient.age} years • {patient.gender} • {patient.constitution}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50">
                <Edit3 className="w-4 h-4 mr-2 inline" />
                Edit Profile
              </button>
              <button 
                onClick={() => onNavigate('diet-builder')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                New Diet Plan
              </button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="p-6 overflow-y-auto bg-stone-50">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Weight</label>
                      <p className="font-medium text-gray-800">{patient.weight} kg</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Height</label>
                      <p className="font-medium text-gray-800">{patient.height}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">BMI</label>
                      <p className="font-medium text-gray-800">{patient.bmi}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Blood Group</label>
                      <p className="font-medium text-gray-800">{patient.bloodGroup}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Ayurvedic Constitution</label>
                    <p className="font-medium text-amber-600">{patient.constitution}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium text-gray-800">{patient.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium text-gray-800">{patient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <p className="font-medium text-gray-800">{patient.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Occupation</label>
                    <p className="font-medium text-gray-800">{patient.occupation}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600">Allergies</label>
                    <p className="font-medium text-red-600">{patient.allergies}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Medical History</label>
                    <p className="font-medium text-gray-800">{patient.medicalHistory}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diet-charts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Diet Chart History</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {patientDietCharts.map((chart, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{chart.title}</h4>
                          <p className="text-sm text-gray-600">Created on {chart.date} • {chart.duration}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm rounded-full ${
                            chart.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {chart.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {progressData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">{item.metric}</h4>
                    <span className={`text-sm font-medium ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Previous</span>
                      <span>{item.previous}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current</span>
                      <span className="font-medium">{item.current}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Reports</h3>
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reports generated yet</p>
                <button 
                  onClick={() => onNavigate('reports')}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Generate Report
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientProfile;