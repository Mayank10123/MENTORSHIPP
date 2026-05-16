'use client';

import { useEffect, useState } from 'react';
import { safeApiFetch, API_URLS } from '@/lib/api';

export default function Dashboard() {
  const [nudge, setNudge] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'mayank@example.com') : 'mayank@example.com';

    // Fetch dashboard data dynamically
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch profile
        const profileData = await safeApiFetch(`${API_URLS.NODE}/api/user/profile?email=${email}`);
        if (profileData) {
          setProfile(profileData);
        }

        // Fetch progress
        const progressData = await safeApiFetch(`${API_URLS.NODE}/api/user/progress?email=${email}`);
        if (progressData) {
          setProgress(progressData);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Fetch mentor nudge from python API
    const fetchNudge = async () => {
      const data = await safeApiFetch(`${API_URLS.PYTHON}/mentor/nudge`, {
        method: 'POST',
        body: JSON.stringify({ streak: 14, xp: 1240, risk_level: 'Low' }),
      });
      if (data) {
        setNudge(data);
      }
    };
    fetchNudge();
  }, []);

  // Graceful fallbacks for local prototyping
  const userProfile = profile || {
    name: 'New Candidate',
    email: 'newcandidate@example.com',
    currentRole: 'Software Engineer',
    targetRole: 'Senior Solutions Architect',
    yearsExperience: 1,
    placementProbability: 0,
    skills: {
      'System Design': 0,
      'Cloud Arch': 0,
      'Distributed Systems': 0,
      'Leadership': 0
    },
    companyFitScores: {
      'Google': 0,
      'AWS': 0,
      'Netflix': 0
    },
    streak: 0,
    totalXP: 0,
    placementProbabilityChange: 0
  };

  const userProgress = progress || {
    riskLevel: 'safe',
    recentActivities: []
  };

  const strokeDashoffset = 552.92 * (1 - userProfile.placementProbability / 100);
  const xpMax = 2000;
  const xpPercent = Math.min((userProfile.totalXP / xpMax) * 100, 100);
  const xpNeeded = Math.max(xpMax - userProfile.totalXP, 0);
  const level = Math.floor(userProfile.totalXP / 500) + 1; // Derived level

  const weeklyChange = userProfile.placementProbabilityChange !== undefined ? userProfile.placementProbabilityChange : 0;
  const changeColor = weeklyChange > 0 ? 'text-[#4edea3]' : weeklyChange < 0 ? 'text-red-400' : 'text-slate-500';
  const changeText = weeklyChange >= 0 ? `+${weeklyChange}%` : `${weeklyChange}%`;

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#B9B9B9] mb-2">Executive Intelligence Console</h1>
        <p className="text-[#b9c8de] body-md">Propelling your trajectory toward {userProfile.targetRole} roles.</p>
      </header>
 
      <div className="grid grid-cols-12 gap-6 auto-rows-fr">
        {/* Placement Probability Gauge */}
        <div className="col-span-12 lg:col-span-4 bg-[#000000] rounded-xl p-8 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#adc6ff] to-[#4edea3]"></div>
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-8">Placement Probability</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-[#2d3449]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-[#4d8eff]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold font-headline text-[#B9B9B9]">{userProfile.placementProbability}%</span>
              <span className={`text-[10px] ${changeColor} font-bold uppercase tracking-tighter`}>{changeText} this week</span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-[#c2c6d6] max-w-[200px]">Probability has increased based on recent certification uploads.</p>
        </div>

        {/* Skill Gap Heatmap */}
        <div className="col-span-12 lg:col-span-8 bg-[#000000] rounded-xl p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest">Skill Gap Heatmap</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-[#2d3449] text-[10px] font-bold text-[#adc6ff] tracking-wide">GOOGLE</span>
              <span className="px-3 py-1 rounded-full bg-[#000000] text-[10px] font-bold text-slate-500 tracking-wide">AMAZON</span>
              <span className="px-3 py-1 rounded-full bg-[#000000] text-[10px] font-bold text-slate-500 tracking-wide">META</span>
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(userProfile.skills || {}).map(([skill, val]) => (
              <div key={skill} className="grid grid-cols-5 gap-4 items-center">
                <div className="col-span-1 text-xs text-slate-500 font-medium py-2">{skill}</div>
                <div className="col-span-4 h-8 bg-[#2d3449] rounded-lg flex overflow-hidden">
                  <div style={{ width: `${val}%` }} className="bg-[#4d8eff]/80 h-full"></div>
                  <div style={{ width: `${100 - val}%` }} className="bg-red-500/20 h-full"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#adc6ff] text-sm">lightbulb</span>
            <p className="text-xs text-[#c2c6d6]">Focus on <span className="text-[#adc6ff] font-bold">Distributed Systems</span> to unlock Tier-1 eligibility.</p>
          </div>
        </div>

        {/* Company Fit Scores */}
        <div className="col-span-12 lg:col-span-5 bg-[#000000] rounded-xl p-8">
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-6">Company Fit Scores</h3>
          <div className="space-y-6">
            {Object.entries(userProfile.companyFitScores || {}).map(([company, score]) => {
              let label = 'Emerging Match';
              let color = 'text-[#b9c8de]';
              if (score >= 90) {
                label = 'Strong Match';
                color = 'text-[#4edea3]';
              } else if (score >= 80) {
                label = 'High Fit';
                color = 'text-[#adc6ff]';
              }
              
              let role = 'Senior Developer';
              if (company === 'Google') role = 'L6 Solutions Architect';
              if (company === 'AWS') role = 'Principal Cloud Architect';
              if (company === 'Netflix') role = 'Senior Software Engineer';

              return (
                <div key={company} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#adc6ff]">corporate_fare</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#B9B9B9]">{company}</p>
                      <p className="text-[10px] text-slate-500">{role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-bold font-headline ${color}`}>{score}%</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Brain & Progress */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl p-6 border border-[#adc6ff]/10 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#adc6ff]">AI Brain Status</h3>
              <div className="w-2 h-2 rounded-full bg-[#4edea3] ai-pulse"></div>
            </div>
            <div className="my-4">
              <p className="text-3xl font-headline font-extrabold text-[#B9B9B9]">Synchronized</p>
              <p className="text-[10px] text-slate-400 mt-1">Last neural update: 14 mins ago</p>
            </div>
            <div className="flex gap-1 mt-2">
              <div className={`h-1 flex-1 rounded-full ${userProfile.streak >= 1 ? 'bg-[#adc6ff]' : 'bg-[#adc6ff]/20'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${userProfile.streak >= 3 ? 'bg-[#adc6ff]' : 'bg-[#adc6ff]/20'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${userProfile.streak >= 7 ? 'bg-[#adc6ff]' : 'bg-[#adc6ff]/20'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${userProfile.streak >= 14 ? 'bg-[#adc6ff]' : 'bg-[#adc6ff]/20'}`}></div>
            </div>
          </div>

          <div className="bg-[#222a3d] rounded-xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-widest">Level {level} Executive</span>
              <span className="text-[10px] font-bold text-slate-400">{userProfile.totalXP} / {xpMax} XP</span>
            </div>
            <div className="my-4">
              <div className="w-full h-3 bg-[#2d3449] rounded-full overflow-hidden">
                <div style={{ width: `${xpPercent}%` }} className="h-full bg-[#4edea3]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-sm">stars</span>
              <p className="text-[10px] text-[#c2c6d6]">{xpNeeded} XP until <span className="text-[#4edea3]">Next Director Tier</span></p>
            </div>
          </div>

          <div className="col-span-2 bg-[#000000] rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <span className="material-symbols-outlined text-3xl">local_fire_department</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-headline text-[#B9B9B9]">{userProfile.streak} Day Streak</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">You are in the top 2% of candidates</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const activeDaysCount = userProfile.streak >= 7 ? 7 : userProfile.streak;
                const isDayActive = idx < activeDaysCount;
                return (
                  <div key={idx} className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold ${isDayActive ? 'bg-[#4edea3]/20 text-[#4edea3]' : 'bg-[#2d3449] text-slate-500'}`}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mentor Nudge */}
        {nudge && (
          <div className="col-span-12 rounded-xl p-6 border-l-4 border-[#adc6ff] bg-[#adc6ff]/10">
            <p className="text-sm font-bold capitalize text-[#B9B9B9]">{nudge.nudge_type} Message</p>
            <p className="text-sm text-[#c2c6d6]">{nudge.message}</p>
          </div>
        )}

        {/* Recent Activity */}
        <div className="col-span-12 bg-[#000000] rounded-xl p-8">
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-8">AI-Driven Strategic Adjustments</h3>
          <div className="space-y-0">
            {(userProgress.recentActivities || []).map((item, idx) => (
              <div key={idx} className="flex gap-6 py-6 border-b border-slate-800/20 last:border-b-0">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#adc6ff]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#adc6ff] text-sm">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#B9B9B9]">{item.title}</h4>
                    <span className="text-[10px] text-slate-500 font-medium">{item.time}</span>
                  </div>
                  <p className="text-xs text-[#c2c6d6] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

