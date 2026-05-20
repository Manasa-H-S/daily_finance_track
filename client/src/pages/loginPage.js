// src/pages/LoginPage.js

import React, { useState } from 'react';
import {
  loginUser,
  registerUser,
} from '../services/authService';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;

      if (isSignUp) {
        // Register new user
        response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Login existing user
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      }

      // Save token and user info
      localStorage.setItem('token', response.token);
      localStorage.setItem(
        'user',
        JSON.stringify(response.user)
      );

      // Reload app so App.js detects token and shows dashboard
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f5ff] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-[#ede9fe]">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Finance Tracker
        </h1>

        <p className="text-gray-500 mb-6">
          {isSignUp
            ? 'Create your account'
            : 'Login to continue'}
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-2xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name field for Sign Up only */}
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-200"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-200"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-2xl font-medium transition disabled:opacity-50"
          >
            {loading
              ? isSignUp
                ? 'Creating Account...'
                : 'Logging In...'
              : isSignUp
              ? 'Sign Up'
              : 'Login'}
          </button>
        </form>

        {/* Toggle Login / Sign Up */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isSignUp
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-pink-500 font-semibold hover:underline"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;