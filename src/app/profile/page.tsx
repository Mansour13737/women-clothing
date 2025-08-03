'use client';

import { useAuth, useWishlist, useUI } from '@/store/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated, login, logout, register } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { addNotification } = useUI();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async () => {
    try {
      await login('test@example.com', 'password');
      addNotification({
        type: 'success',
        message: 'Successfully logged in!',
        duration: 3000
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Login failed. Please try again.',
        duration: 3000
      });
    }
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'Passwords do not match!',
        duration: 3000
      });
      return;
    }

    if (signupData.password.length < 6) {
      addNotification({
        type: 'error',
        message: 'Password must be at least 6 characters!',
        duration: 3000
      });
      return;
    }

    try {
      await register(signupData.name, signupData.email, signupData.password);
      addNotification({
        type: 'success',
        message: 'Account created successfully!',
        duration: 3000
      });
      setShowSignup(false);
      setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Registration failed. Please try again.',
        duration: 3000
      });
    }
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'info',
      message: 'Successfully logged out!',
      duration: 3000
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen text-[13px] bg-gradient-to-br from-[#dcdddc] to-[#f5f5f5] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full mx-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-[#262013] mb-2">
              {showSignup ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-[#262013]/70 font-serif">
              {showSignup ? 'Sign up for your account' : 'Sign in to your account'}
            </p>
          </div>
          
          {!showSignup ? (
            // Login Form
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-[#262013] text-white py-3 rounded-lg font-medium hover:bg-[#262013]/90 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          ) : (
            // Signup Form
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#262013] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleSignup}
                className="w-full bg-[#262013] text-white py-3 rounded-lg font-medium hover:bg-[#262013]/90 transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-[#262013]/70">
              {showSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span 
                onClick={() => setShowSignup(!showSignup)}
                className="text-[#262013] font-medium cursor-pointer hover:underline"
              >
                {showSignup ? 'Sign in' : 'Sign up'}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dcdddc] to-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-display font-bold text-[#262013]">
            My Profile
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Image
                src={user?.avatar || '/icons/profile-f.svg'}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full border-4 border-[#262013]/10"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-[#262013]">
                {user?.name || 'User Name'}
              </h2>
              <p className="text-[#262013]/70 font-serif">
                {user?.email || 'user@example.com'}
              </p>
              <p className="text-sm text-[#262013]/60 mt-1">
                Member since 2024
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 px-6">
              {[
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'orders', label: 'Orders', icon: '📦' },
                { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#262013] text-[#262013]'
                      : 'border-transparent text-[#262013]/60 hover:text-[#262013]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-[#262013] mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#262013] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#262013] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#262013] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#262013] mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#262013] focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="bg-[#262013] text-white px-6 py-3 rounded-lg hover:bg-[#262013]/90 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-display font-bold text-[#262013] mb-4">
                  Order History
                </h3>
                <div className="text-center py-8">
                  <p className="text-[#262013]/60">No orders yet</p>
                  <p className="text-sm text-[#262013]/40 mt-2">Your order history will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-xl font-display font-bold text-[#262013] mb-4">
                  My Wishlist ({wishlistItems.length} items)
                </h3>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#262013]/60">Your wishlist is empty</p>
                    <p className="text-sm text-[#262013]/40 mt-2">Start adding items to your wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-[#262013] mb-1">{item.name}</h4>
                        <p className="text-sm text-[#262013]/60">${item.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-display font-bold text-[#262013] mb-4">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#262013]">Email Notifications</h4>
                      <p className="text-sm text-[#262013]/60">Receive updates about orders and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#262013]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#262013]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#262013]">SMS Notifications</h4>
                      <p className="text-sm text-[#262013]/60">Receive order updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#262013]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#262013]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 