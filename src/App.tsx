import React, { useState } from 'react';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientProfile from './components/PatientProfile';
import FoodDatabase from './components/FoodDatabase';
import DietChartBuilder from './components/DietChartBuilder';
import Reports from './components/Reports';
import MobilePatientView from './components/MobilePatientView';

type UserRole = 'doctor' | 'patient';
type CurrentPage = 'login' | 'dashboard' | 'patient-profile' | 'food-database' | 'diet-builder' | 'reports' | 'mobile-patient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('doctor');
  const [currentPage, setCurrentPage] = useState<CurrentPage>('login');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'doctor') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('mobile-patient');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleNavigation = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (userRole === 'patient') {
    return <MobilePatientView onLogout={handleLogout} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DoctorDashboard onNavigate={handleNavigation} />;
      case 'patient-profile':
        return <PatientProfile onNavigate={handleNavigation} />;
      case 'food-database':
        return <FoodDatabase onNavigate={handleNavigation} />;
      case 'diet-builder':
        return <DietChartBuilder onNavigate={handleNavigation} />;
      case 'reports':
        return <Reports onNavigate={handleNavigation} />;
      default:
        return <DoctorDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;