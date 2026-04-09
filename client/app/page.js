'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [nudge, setNudge] = useState(null);

  useEffect(() => {
    // Fetch mentor nudge from API if backend is available
    const fetchNudge = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/mentor/nudge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ streak: 14, xp: 1240, risk_level: 'Low' }),
        });
        if (response.ok) {
          const data = await response.json();
          setNudge(data);
        }
      } catch (err) {
        console.log('Backend not available, using demo data');
      }
    };
    fetchNudge();
  }, []);

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#dae2fd] mb-2">Executive Intelligence Console</h1>
        <p className="text-[#b9c8de] body-md">Propelling your trajectory toward Lead Solutions Architect roles.</p>
      </header>

      <div className="grid grid-cols-12 gap-6 auto-rows-fr">
        {/* Placement Probability Gauge */}
        <div className="col-span-12 lg:col-span-4 bg-[#131b2e] rounded-xl p-8 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#adc6ff] to-[#4edea3]"></div>
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-8">Placement Probability</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-[#2d3449]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-[#4d8eff]" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset="176.93" strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold font-headline text-[#dae2fd]">68%</span>
              <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-tighter">+4% this week</span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-[#c2c6d6] max-w-[200px]">Probability has increased based on recent certification uploads.</p>
        </div>

        {/* Skill Gap Heatmap */}
        <div className="col-span-12 lg:col-span-8 bg-[#171f33] rounded-xl p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest">Skill Gap Heatmap</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-[#2d3449] text-[10px] font-bold text-[#adc6ff] tracking-wide">GOOGLE</span>
              <span className="px-3 py-1 rounded-full bg-[#131b2e] text-[10px] font-bold text-slate-500 tracking-wide">AMAZON</span>
              <span className="px-3 py-1 rounded-full bg-[#131b2e] text-[10px] font-bold text-slate-500 tracking-wide">META</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 text-xs text-slate-500 font-medium py-2">System Design</div>
            <div className="col-span-4 h-8 bg-[#2d3449] rounded-lg flex overflow-hidden">
              <div className="w-[85%] bg-[#4d8eff]/80 h-full"></div>
              <div className="w-[15%] bg-red-500/20 h-full"></div>
            </div>

            <div className="col-span-1 text-xs text-slate-500 font-medium py-2">Cloud Arch</div>
            <div className="col-span-4 h-8 bg-[#2d3449] rounded-lg flex overflow-hidden">
              <div className="w-[92%] bg-[#4edea3] h-full"></div>
              <div className="w-[8%] bg-red-500/20 h-full"></div>
            </div>

            <div className="col-span-1 text-xs text-slate-500 font-medium py-2">Distributed Systems</div>
            <div className="col-span-4 h-8 bg-[#2d3449] rounded-lg flex overflow-hidden">
              <div className="w-[60%] bg-[#4d8eff]/60 h-full"></div>
              <div className="w-[40%] bg-red-500/30 h-full"></div>
            </div>

            <div className="col-span-1 text-xs text-slate-500 font-medium py-2">Leadership</div>
            <div className="col-span-4 h-8 bg-[#2d3449] rounded-lg flex overflow-hidden">
              <div className="w-[75%] bg-[#4d8eff]/70 h-full"></div>
              <div className="w-[25%] bg-red-500/20 h-full"></div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#adc6ff] text-sm">lightbulb</span>
            <p className="text-xs text-[#c2c6d6]">Focus on <span className="text-[#adc6ff] font-bold">Distributed Systems</span> to unlock Tier-1 eligibility.</p>
          </div>
        </div>

        {/* Company Fit Scores */}
        <div className="col-span-12 lg:col-span-5 bg-[#131b2e] rounded-xl p-8">
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-6">Company Fit Scores</h3>
          <div className="space-y-6">
            {[
              { company: 'Google', role: 'L6 Solutions Architect', score: '92%', label: 'Strong Match', color: 'text-[#4edea3]' },
              { company: 'AWS', role: 'Principal Cloud Architect', score: '84%', label: 'High Fit', color: 'text-[#adc6ff]' },
              { company: 'Netflix', role: 'Senior Software Engineer', score: '71%', label: 'Emerging Match', color: 'text-[#b9c8de]' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#222a3d] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#adc6ff]">corporate_fare</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#dae2fd]">{item.company}</p>
                    <p className="text-[10px] text-slate-500">{item.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold font-headline ${item.color}`}>{item.score}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</p>
                </div>
              </div>
            ))}
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
              <p className="text-3xl font-headline font-extrabold text-[#dae2fd]">Synchronized</p>
              <p className="text-[10px] text-slate-400 mt-1">Last neural update: 14 mins ago</p>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="h-1 flex-1 bg-[#adc6ff] rounded-full"></div>
              <div className="h-1 flex-1 bg-[#adc6ff] rounded-full"></div>
              <div className="h-1 flex-1 bg-[#adc6ff] rounded-full"></div>
              <div className="h-1 flex-1 bg-[#adc6ff]/20 rounded-full"></div>
            </div>
          </div>

          <div className="bg-[#222a3d] rounded-xl p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-widest">Level 24 Executive</span>
              <span className="text-[10px] font-bold text-slate-400">1,240 / 2,000 XP</span>
            </div>
            <div className="my-4">
              <div className="w-full h-3 bg-[#2d3449] rounded-full overflow-hidden">
                <div className="h-full bg-[#4edea3] w-[62%]"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-sm">stars</span>
              <p className="text-[10px] text-[#c2c6d6]">760 XP until <span className="text-[#4edea3]">Director Tier</span></p>
            </div>
          </div>

          <div className="col-span-2 bg-[#131b2e] rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <span className="material-symbols-outlined text-3xl">local_fire_department</span>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-headline text-[#dae2fd]">14 Day Streak</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">You are in the top 2% of candidates</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold ${idx < 5 ? 'bg-[#4edea3]/20 text-[#4edea3]' : 'bg-[#2d3449] text-slate-500'}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mentor Nudge */}
        {nudge && (
          <div className="col-span-12 rounded-xl p-6 border-l-4 border-[#adc6ff] bg-[#adc6ff]/10">
            <p className="text-sm font-bold capitalize text-[#dae2fd]">{nudge.nudge_type} Message</p>
            <p className="text-sm text-[#c2c6d6]">{nudge.message}</p>
          </div>
        )}

        {/* Recent Activity */}
        <div className="col-span-12 bg-[#171f33] rounded-xl p-8">
          <h3 className="text-[#c2c6d6] font-headline font-bold text-sm uppercase tracking-widest mb-8">AI-Driven Strategic Adjustments</h3>
          <div className="space-y-0">
            {[
              { icon: 'psychology', title: 'Resume Recalibration', time: '2 hours ago', desc: "AI refined the 'Executive Leadership' section of your CV to better align with Amazon's 16 Leadership Principles. Probability increased by +1.2%." },
              { icon: 'monitoring', title: 'Market Intelligence Shift', time: '6 hours ago', desc: "Detected 14 new 'Staff Engineer' openings in the Seattle area. Matching your profile with 4 high-priority leads." },
              { icon: 'auto_awesome', title: 'Interview Insight Generated', time: 'Yesterday', desc: 'Custom behavioral response bank generated for your upcoming technical screening with Google. Focus on Distributed Systems Fault Tolerance.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 py-6 border-b border-slate-800/20 last:border-b-0">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#adc6ff]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#adc6ff] text-sm">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#dae2fd]">{item.title}</h4>
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
