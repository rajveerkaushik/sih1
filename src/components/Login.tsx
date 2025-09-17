import React, { useState } from 'react';
import { Leaf, User, Stethoscope, Eye, EyeOff } from 'lucide-react';

type UserRole = 'doctor' | 'patient';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header with Ayurvedic branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AyurDiet Pro</h1>
          <p className="text-gray-600">Ayurvedic Diet Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>
          
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Login as:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedRole === 'doctor'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-green-300'
                }`}
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Doctor
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedRole === 'patient'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-green-300'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Patient
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Sign In as {selectedRole === 'doctor' ? 'Doctor' : 'Patient'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-green-600 hover:text-green-700 text-sm">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Ayurvedic Elements */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Powered by Ancient Wisdom & Modern Technology</p>
          <div className="flex justify-center space-x-2 text-amber-600">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">Balance • Wellness • Nutrition</span>
            <Leaf className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;