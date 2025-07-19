// src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Signup = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const result = await signup(formData);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold" style={{color: '#222831'}}>
          Create Account
        </h2>
        <p style={{color: '#666'}}>Join our learning community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{borderColor: '#d1d5db'}}
            onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="John Doe"
            required
          />
        </div>

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
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{borderColor: '#d1d5db'}}
            onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
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
            placeholder="Min 6 characters"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{color: '#222831'}}>
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{borderColor: '#d1d5db'}}
            onFocus={(e) => e.target.style.borderColor = '#FF9B17'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            placeholder="Confirm password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300"
          style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p style={{color: '#666'}}>
          Already have an account?{' '}
          <button 
            onClick={onToggleMode}
            className="font-medium hover:underline"
            style={{color: '#FF9B17'}}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;