
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('drj_auth', 'true');
      navigate('/dashboard');
    } else {
      alert("Invalid credentials. Try admin/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-rose-600">
         <div className="flex justify-center mb-6">
            <div className="bg-rose-100 p-4 rounded-full text-rose-600">
               <Shield size={32} />
            </div>
         </div>
         <h1 className="text-2xl font-black text-center mb-2 serif italic">DEEPREST EDITOR</h1>
         <p className="text-gray-500 text-sm text-center mb-8 font-bold uppercase tracking-widest">Authorized Personnel Only</p>
         
         <form onSubmit={handleLogin} className="space-y-6">
            <div>
               <label className="block text-xs font-black uppercase text-gray-400 mb-1">Username</label>
               <input 
                 type="text" 
                 value={username} 
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" 
                 required 
               />
            </div>
            <div>
               <label className="block text-xs font-black uppercase text-gray-400 mb-1">Password</label>
               <input 
                 type="password" 
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" 
                 required 
               />
            </div>
            <button type="submit" className="w-full bg-zinc-900 text-white py-4 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-black transition">Verify Identity</button>
         </form>
         
         <div className="mt-8 text-center">
            <button onClick={() => navigate('/')} className="text-gray-400 text-xs font-bold hover:text-rose-600 transition">Return to Public Site</button>
         </div>
      </div>
    </div>
  );
};

export default Login;
