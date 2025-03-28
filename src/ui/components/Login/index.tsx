// src/components/Login.tsx
import { useState } from 'react';
import { login } from '../../api/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Redirect or update state upon successful login
      window.location.href = '/dashboard'; // Or use your router
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-700 overflow-hidden"> 
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-gray-200 mx-4" 
      >
        <div className="flex items-center gap-1"> {/* Centered the logo */}
          <p className='text-2xl font-bold text-green-500'>Fiscal</p>
          <img src="./desktopIcon.png" alt="Fiscal Logo" className="h-10 w-10" />
        </div>
        <h1 className="text-lg font-semibold my-2 text-gray-800 text-center">Login</h1> {/* Centered the title */}
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Centered error message */}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent" 
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200" 
        >
          Login
        </button>
      </form>
    </div>
  );
}