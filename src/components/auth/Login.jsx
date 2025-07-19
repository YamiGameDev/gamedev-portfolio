// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold" style={{color: '#222831'}}>
          Welcome Back
        </h2>
        <p style={{color: '#666'}}>Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{borderColor: '#d1d5db'}}
            onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="student@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{borderColor: '#d1d5db'}}
            onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300"
          style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p style={{color: '#666'}}>
          Don't have an account?{' '}
          <button 
            onClick={onToggleMode}
            className="font-medium hover:underline"
            style={{color: '#FF9B17'}}
          >
            Sign up
          </button>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2" style={{color: '#222831'}}>Demo Credentials:</h4>
        <div className="text-sm space-y-1" style={{color: '#666'}}>
          <p>Student: student@example.com / password</p>
          <p>Instructor: instructor@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;