'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Store user info in localStorage
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', user.displayName || email.split('@')[0]);
      localStorage.setItem('userToken', await user.getIdToken());
      
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Store user info in localStorage
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
      localStorage.setItem('userToken', await user.getIdToken());
      
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to login with Google.');
      console.error('Google login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-dim flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 w-full max-w-[440px]">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-[#4d8eff]/10 flex items-center justify-center mb-4 backdrop-blur">
            <span className="material-symbols-outlined text-[#adc6ff] text-4xl">psychology</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-[#adc6ff] uppercase">CareerAgent AI</h1>
          <p className="text-[#b9c8de] text-sm mt-1 font-medium">Executive Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#131b2e] p-8 rounded-xl backdrop-blur border border-slate-800/30 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#adc6ff]/30 to-transparent"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-[#222a3d] border border-slate-700/50 text-[#dae2fd] font-semibold py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-[#2d3449] disabled:opacity-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm">Sign in with Google</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-slate-700/30"></div>
              <span className="text-[10px] font-bold text-[#b9c8de] uppercase">OR</span>
              <div className="h-[1px] flex-1 bg-slate-700/30"></div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#b9c8de] uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b9c8de] text-lg">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#222a3d] border border-slate-700/50 rounded-lg py-4 pl-12 pr-4 text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#b9c8de] uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b9c8de] text-lg">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#222a3d] border border-slate-700/50 rounded-lg py-4 pl-12 pr-12 text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b9c8de] hover:text-[#adc6ff] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4d8eff] hover:brightness-110 disabled:opacity-50 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              {!loading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#b9c8de]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#adc6ff] hover:text-[#dae2fd] font-bold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2 bg-[#222a3d]/50 px-4 py-1.5 rounded-full border border-slate-800/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b9c8de]">Powered by Agentic Intelligence</span>
          </div>
        </div>
      </div>
    </main>
  );
}
