import React, { useState } from 'react';
import { Download, FileText, BarChart3, TrendingUp, Calendar } from 'lucide-react';
import Sidebar from './Sidebar';

type CurrentPage = 'login' | 'dashboard' | 'patient-profile' | 'food-database' | 'diet-builder' | 'reports' | 'mobile-patient';

interface ReportsProps {
  onNavigate: (page: CurrentPage) => void;
}

const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const [selectedPatient, setSelectedPatient] = useState('Priya Sharma');
  const [reportType, setReportType] = useState('comprehensive');
  const [dateRange, setDateRange] = useState('last-3-months');

  const patients = ['Priya Sharma', 'Rajesh Kumar', 'Anita Singh', 'Vikram Patel'];

  const reportData = {
    weightProgress: [
      { date: '2023-10', weight: 70, target: 65 },
      { date: '2023-11', weight: 68, target: 65 },
      { date: '2023-12', weight: 66, target: 65 },
      { date: '2024-01', weight: 65, target: 65 },
    ],
    nutritionalTrends: {
      calories: { average: 1650, target: 1600, trend: 'improving' },
      protein: { average: 65, target: 60, trend: 'good' },
      carbs: { average: 180, target: 200, trend: 'good' },
      fat: { average: 55, target: 60, trend: 'improving' },
    },
    doshaBalance: {
      vata: 30,
      pitta: 45,
      kapha: 25,
      recommendation: 'Increase Vata-pacifying foods, maintain current Pitta balance'
    },
    symptoms: [
      { symptom: 'Fatigue', initial: 7, current: 3, improvement: 57 },
      { symptom: 'Digestive Issues', initial: 8, current: 2, improvement: 75 },
      { symptom: 'Sleep Quality', initial: 4, current: 8, improvement: 100 },
      { symptom: 'Stress Level', initial: 9, current: 4, improvement: 56 },
    ]
  };

  const generateReport = () => {
    // Simulate report generation
    console.log('Generating report for:', selectedPatient, reportType, dateRange);
  };

  return (
    <div className="flex">
      <Sidebar 
        currentPage="reports" 
        onNavigate={onNavigate} 
        onLogout={() => onNavigate('login')} 
      />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive patient progress analysis</p>
            </div>
            <button 
              onClick={generateReport}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              Generate PDF
            </button>
          </div>
        </header>

        {/* Report Configuration */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="comprehensive">Comprehensive Report</option>
                <option value="nutritional">Nutritional Analysis</option>
                <option value="progress">Progress Summary</option>
                <option value="ayurvedic">Ayurvedic Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6 overflow-y-auto bg-stone-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Weight Progress</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-4">
                {reportData.weightProgress.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{entry.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-800">{entry.weight} kg</p>
                        <p className="text-xs text-gray-500">Target: {entry.target} kg</p>
                      </div>
                      <div className={`w-16 h-2 rounded-full ${
                        entry.weight <= entry.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 font-medium">Goal Achieved! 🎉</p>
                <p className="text-xs text-green-600">Target weight reached in 4 months</p>
              </div>
            </div>

            {/* Nutritional Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Nutritional Trends</h3>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-4">
                {Object.entries(reportData.nutritionalTrends).map(([nutrient, data]) => (
                  <div key={nutrient} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">{nutrient}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        data.trend === 'good' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {data.trend}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Average: {data.average}</span>
                      <span className="text-gray-600">Target: {data.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((data.average / data.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosha Balance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Dosha Balance Analysis</h3>
                <div className="w-5 h-5 bg-amber-500 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-purple-600 font-bold">{reportData.doshaBalance.vata}%</span>
                    </div>
                    <p className="text-sm text-gray-600">Vata</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-red-600 font-bold">{reportData.doshaBalance.pitta}%</span>
                    </div>
                    <p className="text-sm text-gray-600">Pitta</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-yellow-600 font-bold">{reportData.doshaBalance.kapha}%</span>
                    </div>
                    <p className="text-sm text-gray-600">Kapha</p>
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">{reportData.doshaBalance.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Symptom Improvements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Symptom Improvements</h3>
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <div className="space-y-4">
                {reportData.symptoms.map((symptom, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{symptom.symptom}</span>
                      <span className="text-sm font-bold text-green-600">+{symptom.improvement}%</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>Initial: {symptom.initial}/10</span>
                      <span>Current: {symptom.current}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${symptom.improvement}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">Excellent</p>
                <p className="text-sm text-green-600">Overall Progress</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">85%</p>
                <p className="text-sm text-blue-600">Goal Achievement</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-700">4.2/5</p>
                <p className="text-sm text-purple-600">Health Score</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Key Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Continue current dietary plan with seasonal modifications</li>
                <li>• Increase morning pranayama practice to 15 minutes</li>
                <li>• Add more cooling foods during summer months</li>
                <li>• Schedule monthly follow-up consultations</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;