
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, User } from 'lucide-react';
import { dbService } from '../../services/dbService.js';
import Logo from '../../components/logo.png';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await dbService.login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access Denied.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex bg-blue-600 rounded-2xl mb-6 shadow-xl shadow-blue-500/20">
           <div className={`p-1.5 md:p-2 rounded-lg  transition-transform`} style={{ backgroundColor: '#1b213bff' }}>
             <img src={Logo} alt="TigraTech Logo" className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TigraAdmin Access</h1>
          <p className="text-gray-500">Authorized personnel only.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl text-center">{error}</div>}
          
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-blue-500 transition-colors outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-blue-500 transition-colors outline-none"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20">
            {isLoading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
        
        <button onClick={() => navigate('/')} className="w-full text-center text-gray-500 text-sm mt-8 hover:text-white transition-colors">
          Return to public site
        </button>
      </div>
    </div>
  );
};
