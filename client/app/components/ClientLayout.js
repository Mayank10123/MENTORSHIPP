'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [userName, setUserName] = useState('');

  // Check if current page requires authentication
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    // Redirect to login if not authenticated and not on auth pages
    if (!loading && !user && !isAuthPage) {
      router.push('/login');
    }
  }, [user, loading, isAuthPage, router]);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b1326]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#adc6ff]"></div>
      </div>
    );
  }

  const navItems = [
    { href: '/', label: 'Dashboard', icon: 'dashboard', active: pathname === '/' },
    { href: '/profile-analyzer', label: 'Profile Analyzer', icon: 'person_search', active: pathname === '/profile-analyzer' },
    { href: '/company-intelligence', label: 'Companies', icon: 'business', active: pathname === '/company-intelligence' },
    { href: '/roadmaps', label: 'Roadmap', icon: 'alt_route', active: pathname === '/roadmaps' },
    { href: '/interview', label: 'Interview Studio', icon: 'record_voice_over', active: pathname === '/interview' },
    { href: '/resume', label: 'Resume Lab', icon: 'description', active: pathname === '/resume' },
    { href: '/progress-intelligence', label: 'Progress', icon: 'analytics', active: pathname === '/progress-intelligence' },
    { href: '/mentor-chat', label: 'Mentor Chat', icon: 'chat', active: pathname === '/mentor-chat' },
    { href: '/gamification', label: 'Achievements', icon: 'trophy', active: pathname === '/gamification' },
    { href: '/profile', label: 'Profile', icon: 'person', active: pathname === '/profile' },
  ];

  return (
    <>
      {/* Show navigation only if user is authenticated and not on auth pages */}
      {user && !isAuthPage && (
        <>
          {/* TopAppBar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b1326]/60 backdrop-blur-xl flex justify-between items-center px-8 h-16">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold tracking-tighter text-blue-100 font-headline">The Cognitive Architecture</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-slate-400">
                <span className="material-symbols-outlined hover:text-blue-200 transition-colors cursor-pointer active:scale-95">bolt</span>
                <span className="material-symbols-outlined hover:text-blue-200 transition-colors cursor-pointer active:scale-95">notifications</span>
                <span className="material-symbols-outlined hover:text-blue-200 transition-colors cursor-pointer active:scale-95">account_circle</span>
              </div>
            </div>
          </header>

          {/* SideNavBar */}
          <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-[#0b1326] border-r border-slate-800/20 flex flex-col py-8 px-4 shadow-2xl shadow-black/40">
            <div className="mt-16 mb-8 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#222a3d] border border-slate-700/20">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold">AI</div>
                </div>
                <div>
                  <p className="text-sm font-bold font-headline text-[#dae2fd]">Executive Coach</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] ai-pulse"></span>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">AI Pulse: Active</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ease-in-out font-inter text-sm font-medium rounded-lg ${
                    item.active
                      ? 'text-blue-400 border-r-2 border-blue-400 bg-blue-500/5'
                      : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-slate-800/20">
              <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-800/40 hover:text-slate-200 transition-all text-sm font-medium">
                <span className="material-symbols-outlined">settings</span>
                Settings
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold font-headline transition-all"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={`${user && !isAuthPage ? 'ml-64 pt-24' : ''} px-10 pb-12 min-h-screen`}>
        {children}
      </main>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-green-500/5 rounded-full blur-[120px]"></div>
      </div>
    </>
  );
}
