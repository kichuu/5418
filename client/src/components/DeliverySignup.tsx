'use client'

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function DeliverySignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deliveryData = {
      name,
      email,
      phoneNumber,
      password,
      role: 'delivery', // Delivery personnel role
      currentLocation,
    };

    try {
      const response = await axios.post('http://localhost:5050/api/auth/register', deliveryData);
      alert('Delivery personnel registered successfully!');
      router.push('/auth/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error(error);
      alert('Error registering delivery personnel');
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl backdrop-blur-sm flex-grow">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-zinc-400">Start your journey with TrafficRelief</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="delivery-name" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Full name
          </label>
          <div className="relative">
            <input
              id="delivery-name"
              type="text"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <User className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="delivery-email" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <input
              id="delivery-email"
              type="email"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="delivery-password" className="block text-sm font-medium text-zinc-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="delivery-password"
              type="password"
              className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
        >
          Create account
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </form>
    </div>
  );
}