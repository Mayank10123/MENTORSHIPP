'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Create user with Firebase
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;

      // Update profile with display name
      await updateProfile(user, { displayName: formData.name });

      // Store user info in localStorage
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userToken', await user.getIdToken());

      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user info in localStorage
      localStorage.setItem('userName', user.displayName || user.email.split('@')[0]);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userToken', await user.getIdToken());

      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up with Google.');
      console.error('Google signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-dim flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[#4d8eff]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-[10%] w-[400px] h[400px] bg-[#4edea3]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 w-full max-w-6xl grid md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Branding */}
        <section className="hidden md:flex md:col-span-5 flex-col space-y-8">
          <header>
            <h1 className="text-[#adc6ff] font-black text-3xl tracking-tighter uppercase mb-2">CareerAgent AI</h1>
            <p className="text-[#b9c8de] font-medium tracking-wide text-sm uppercase">Executive Protocol v4.0</p>
          </header>
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold text-[#dae2fd] leading-tight">
              Engineer your next <span className="text-[#adc6ff]">strategic</span> move.
            </h2>
            <p className="text-lg text-[#b9c8de] max-w-md leading-relaxed">
              Deploy your personal AI intelligence suite to manage your career trajectory and market strategy.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-[#222a3d] p-6 rounded-xl border border-slate-800/30">
              <span className="material-symbols-outlined text-[#adc6ff] text-2xl mb-3 block">psychology</span>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-[#dae2fd]">Intelligence</h3>
              <p className="text-xs text-[#b9c8de]">Real-time market positioning.</p>
            </div>
            <div className="bg-[#222a3d] p-6 rounded-xl border border-slate-800/30">
              <span className="material-symbols-outlined text-[#adc6ff] text-2xl mb-3 block">lock</span>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 text-[#dae2fd]">Vault</h3>
              <p className="text-xs text-[#b9c8de]">Encrypted career assets.</p>
            </div>
          </div>
        </section>

        {/* Right Column: Form */}
        <section className="md:col-span-7 flex justify-center lg:justify-start">
          <div className="bg-[#131b2e] w-full max-w-md p-10 rounded-2xl border border-slate-800/30 backdrop-blur shadow-2xl relative">
            <div className="absolute left-0 top-12 w-[2px] h-12 bg-[#adc6ff] shadow-[0_0_15px_rgba(173,198,255,0.6)]"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#dae2fd] mb-2">Create Account</h2>
              <p className="text-[#b9c8de] text-sm">Join the elite network of intelligent careers.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {/* Google SSO */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-[#222a3d] hover:bg-[#2d3449] disabled:opacity-50 transition-all py-3.5 rounded-lg font-semibold text-[#dae2fd] border border-slate-800/30"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
                </svg>
                Sign up with Google
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-slate-800/20"></div>
                <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-[#b9c8de]">Or</span>
                <div className="flex-grow border-t border-slate-800/20"></div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#adc6ff] ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b9c8de] text-lg">person</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Johnathan Executive"
                    className="w-full bg-[#222a3d] border border-slate-700/50 focus:border-[#adc6ff] rounded-lg py-3.5 pl-12 pr-4 text-[#dae2fd] placeholder-slate-500 transition-all focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#adc6ff] ml-1">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b9c8de] text-lg">mail</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@corporation.com"
                    className="w-full bg-[#222a3d] border border-slate-700/50 focus:border-[#adc6ff] rounded-lg py-3.5 pl-12 pr-4 text-[#dae2fd] placeholder-slate-500 transition-all focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#adc6ff] ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b9c8de] text-lg">lock</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#222a3d] border border-slate-700/50 focus:border-[#adc6ff] rounded-lg py-3.5 pl-12 pr-4 text-[#dae2fd] placeholder-slate-500 transition-all focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" className="mt-1 rounded bg-[#222a3d] border-slate-700/50 text-[#adc6ff]" required />
                <p className="text-xs text-[#b9c8de] leading-relaxed">
                  I authorize CareerAgent AI to analyze my career data under the Security Protocol.
                </p>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#4d8eff] to-[#adc6ff] text-white font-bold py-4 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Creating Account...' : 'Initialize Deployment'}
                {!loading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
              </button>
            </form>

            <footer className="mt-8 text-center">
              <p className="text-sm text-[#b9c8de]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#adc6ff] font-bold hover:underline transition-all">
                  Sign in
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
