'use client';

import { useState } from 'react';

const leaderboardData = [
  { rank: 1, name: 'Alex Chen', xp: 4500, level: 'Elite', streak: 45, avatar: '👨‍💻' },
  { rank: 2, name: 'Sarah Johnson', xp: 4200, level: 'Pro', streak: 38, avatar: '👩‍💻' },
  { rank: 3, name: 'Priya Sharma', xp: 3950, level: 'Advanced', streak: 32, avatar: '👩‍🎓' },
  { rank: 4, name: 'You', xp: 2850, level: 'Intermediate', streak: 12, avatar: '⭐', isUser: true },
  { rank: 5, name: 'James Cooper', xp: 2600, level: 'Intermediate', streak: 18, avatar: '🧑‍💼' },
  { rank: 6, name: 'Lisa Wang', xp: 2300, level: 'Beginner', streak: 8, avatar: '👩‍💻' },
];

export default function Gamification() {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const userStats = {
    xp: 2850,
    level: 'Intermediate',
    streak: 12,
    nextLevelXp: 3500,
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#dae2fd] mb-2">Gamification & Achievements</h1>
        <p className="text-[#b9c8de]">Track progress, earn XP, climb levels, and compete on the leaderboard</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* User Stats */}
        <div className="col-span-12">
          <div className="bg-gradient-to-r from-[#4d8eff]/20 to-[#4edea3]/20 rounded-xl p-8 border border-[#adc6ff]/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Total XP</p>
                <p className="text-4xl font-black text-[#adc6ff]">{userStats.xp}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Level</p>
                <p className="text-3xl font-black text-[#4edea3]">{userStats.level}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Current Streak</p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">🔥 {userStats.streak}d</p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Progress to Next</p>
                <p className="text-lg font-bold text-[#dae2fd]">{userStats.xp}/{userStats.nextLevelXp}</p>
                <div className="w-full bg-[#131b2e] rounded-full h-2 mt-2 overflow-hidden">
                  <div style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }} className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4edea3]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="col-span-12">
          <div className="flex border-b border-slate-800/20 bg-[#171f33] rounded-t-xl overflow-hidden">
            {[
              { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
              { id: 'achievements', label: 'Achievements', icon: 'trophy' },
              { id: 'levels', label: 'Levels & XP', icon: 'auto_awesome' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-[#adc6ff] border-b-2 border-[#adc6ff]'
                    : 'text-[#b9c8de] hover:text-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-[#171f33] rounded-b-xl border border-t-0 border-slate-800/20 p-6">
            {/* Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-3">
                {leaderboardData.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      user.isUser
                        ? 'bg-[#4edea3]/10 border-[#4edea3]/40'
                        : 'bg-[#131b2e] border-slate-700 hover:border-[#adc6ff]/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : user.rank === 2 ? 'bg-slate-500/20 text-slate-300' : user.rank === 3 ? 'bg-orange-500/20 text-orange-400' : 'bg-[#4edea3]/10 text-[#4edea3]'}`}>
                        {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-[#dae2fd]">{user.avatar} {user.name}</p>
                        <p className="text-xs text-[#b9c8de]">{user.level}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-2xl font-black text-[#adc6ff]">{user.xp}</p>
                        <p className="text-xs text-[#b9c8de]">XP</p>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-orange-400">🔥 {user.streak}d</p>
                        <p className="text-xs text-[#b9c8de]">streak</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: '🎯', title: 'First Interview', desc: 'Complete your first mock interview' },
                  { emoji: '📈', title: 'Rising Star', desc: 'Reach 50% placement probability' },
                  { emoji: '🔥', title: '7-Day Warrior', desc: 'Maintain a 7-day activity streak' },
                  { emoji: '💯', title: 'ATS Master', desc: 'Achieve 85+ ATS score on resume' },
                  { emoji: '🏆', title: 'Leaderboard Top 10', desc: 'Reach top 10 on leaderboard', locked: true },
                  { emoji: '🚀', title: 'Rocket Start', desc: 'Earn 1000 XP in first week', locked: true },
                ].map((achievement, idx) => (
                  <div key={idx} className={`p-6 rounded-lg border ${achievement.locked ? 'bg-[#131b2e]/50 border-slate-700/50 opacity-50' : 'bg-[#131b2e] border-[#4edea3]/20'}`}>
                    <p className="text-4xl mb-2">{achievement.emoji}</p>
                    <p className="font-bold text-[#dae2fd] mb-1">{achievement.title}</p>
                    <p className="text-xs text-[#b9c8de]">{achievement.desc}</p>
                    {achievement.locked && <p className="text-xs text-slate-500 mt-2">🔒 Locked</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Levels */}
            {activeTab === 'levels' && (
              <div className="space-y-6">
                {[
                  { level: 'Beginner', range: '0-1000 XP', color: 'from-green-400 to-emerald-500', current: false },
                  { level: 'Intermediate', range: '1000-3000 XP', color: 'from-blue-400 to-cyan-500', current: true },
                  { level: 'Advanced', range: '3000-6000 XP', color: 'from-purple-400 to-pink-500', current: false },
                  { level: 'Pro', range: '6000-10000 XP', color: 'from-orange-400 to-red-500', current: false },
                  { level: 'Elite', range: '10000+ XP', color: 'from-yellow-400 to-orange-500', current: false },
                ].map((item, idx) => (
                  <div key={idx} className={`p-6 rounded-lg border ${item.current ? 'bg-[#4edea3]/10 border-[#4edea3]/40' : 'bg-[#131b2e] border-slate-700'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className={`font-bold text-lg bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.level}</p>
                        <p className="text-xs text-[#b9c8de]">{item.range}</p>
                      </div>
                      {item.current && <span className="px-3 py-1 bg-[#4edea3]/20 text-[#4edea3] text-xs font-bold rounded-full">Your Level</span>}
                    </div>

                    <div className="w-full bg-[#0b1326] rounded-full h-2 overflow-hidden">
                      <div style={{ width: item.current ? '85%' : '0%' }} className={`h-full bg-gradient-to-r ${item.color}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* XP Sources */}
        <div className="col-span-12">
          <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
            <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#adc6ff]">stars</span>
              How to Earn XP
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { action: 'Daily Login', xp: '+10 XP', icon: '📅' },
                { action: 'Complete Task', xp: '+50 XP', icon: '✅' },
                { action: 'Mock Interview', xp: '+150 XP', icon: '🎙️' },
                { action: 'Resume Analysis', xp: '+75 XP', icon: '📄' },
                { action: 'Top Leaderboard', xp: '+500 XP', icon: '👑' },
                { action: 'Streak Bonus', xp: '+20 XP/day', icon: '🔥' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#131b2e] rounded-lg border border-slate-700">
                  <p className="text-2xl mb-2">{item.icon}</p>
                  <p className="font-bold text-[#dae2fd] mb-1">{item.action}</p>
                  <p className="text-lg font-bold text-[#4edea3]">{item.xp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
