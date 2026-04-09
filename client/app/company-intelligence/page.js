'use client';

import { useState } from 'react';
import { safeApiFetch, API_URLS } from '@/lib/api';

const companies = [
  { name: 'Google', logo: '🔷', difficulty: 9 },
  { name: 'Amazon', logo: '🔶', difficulty: 8 },
  { name: 'Meta', logo: '👁️', difficulty: 9 },
  { name: 'Microsoft', logo: '⌘', difficulty: 7 },
  { name: 'Apple', logo: '🍎', difficulty: 8 },
  { name: 'TCS', logo: '🏢', difficulty: 4 },
  { name: 'Infosys', logo: '📊', difficulty: 4 },
];

export default function CompanyIntelligence() {
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [intelligence, setIntelligence] = useState(null);
  const [loading, setLoading] = useState(false);

  const getIntelligence = async (company) => {
    setSelectedCompany(company);
    setLoading(true);
    try {
      const data = await safeApiFetch(`${API_URLS.PYTHON}/intelligence/company`, {
        method: 'POST',
        body: JSON.stringify({
          company_name: company,
          target_role: targetRole,
        }),
      });

      if (data) {
        setIntelligence(data);
      } else {
        setIntelligence(null);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#dae2fd] mb-2">Company Intelligence</h1>
        <p className="text-[#b9c8de]">Hiring patterns, interview difficulty, and preparation paths</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Company Selector */}
        <div className="col-span-12">
          <div className="bg-[#171f33] rounded-xl p-6 border border-slate-800/20">
            <h3 className="text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-4">Select Company</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {companies.map((company) => (
                <button
                  key={company.name}
                  onClick={() => getIntelligence(company.name)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    selectedCompany === company.name
                      ? 'border-[#4edea3] bg-[#4edea3]/10'
                      : 'border-slate-700 hover:border-[#adc6ff]'
                  }`}
                >
                  <span className="text-2xl">{company.logo}</span>
                  <span className="text-xs font-bold text-[#dae2fd]">{company.name}</span>
                  <span className={`text-xs font-semibold ${company.difficulty > 7 ? 'text-red-400' : company.difficulty > 5 ? 'text-yellow-400' : 'text-[#4edea3]'}`}>
                    {company.difficulty}/10
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Target Role Selector */}
        <div className="col-span-12">
          <div className="bg-[#171f33] rounded-xl p-6 border border-slate-800/20">
            <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-3">Target Role</label>
            <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="w-full md:w-64 p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] focus:outline-none focus:border-[#adc6ff]">
              <option>Software Engineer</option>
              <option>Senior Engineer</option>
              <option>Product Manager</option>
              <option>Data Scientist</option>
              <option>DevOps Engineer</option>
            </select>
          </div>
        </div>

        {/* Company Intelligence Display */}
        {intelligence && (
          <>
            {/* Difficulty Meter */}
            <div className="col-span-12 md:col-span-6">
              <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
                <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#adc6ff]">speed</span>
                  Difficulty Level
                </h3>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-[#c2c6d6]">Interview Difficulty</span>
                    <span className="text-2xl font-black text-[#4d8eff]">{intelligence.difficulty}/10</span>
                  </div>
                  <div className="w-full bg-[#131b2e] rounded-full h-3 overflow-hidden border border-slate-700">
                    <div style={{ width: `${intelligence.difficulty * 10}%` }} className={`h-full transition-all duration-500 ${intelligence.difficulty > 7 ? 'bg-red-500' : intelligence.difficulty > 5 ? 'bg-yellow-500' : 'bg-[#4edea3]'}`}></div>
                  </div>
                </div>

                <p className="text-[#b9c8de] text-sm">{intelligence.pattern}</p>
              </div>
            </div>

            {/* Hiring Rate */}
            <div className="col-span-12 md:col-span-6">
              <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
                <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3]">trending_up</span>
                  Hiring Metrics
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-[#c2c6d6] font-semibold block mb-2">Hiring Rate</span>
                    <span className="text-3xl font-black text-[#4edea3]">{intelligence.hiring_rate}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#c2c6d6] font-semibold block mb-2">Match Score</span>
                    <span className="text-2xl font-bold text-[#adc6ff]">{intelligence.match_score}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prep Roadmap */}
            <div className="col-span-12">
              <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
                <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4d8eff]">map</span>
                  Preparation Roadmap for {selectedCompany}
                </h3>

                <div className="space-y-4">
                  {[
                    { week: 'Week 1-2', focus: 'Foundation: Data Structures & Algorithms', tasks: ['Learn arrays, linked lists', 'Practice 20 LeetCode problems'] },
                    { week: 'Week 3-4', focus: intelligence.pattern.includes('DSA') ? 'DSA Deep Dive' : 'System Design Fundamentals', tasks: ['Master complex problems', 'Study design patterns'] },
                    { week: 'Week 5-6', focus: intelligence.pattern.includes('DSA') ? 'System Design' : 'Behavioral Prep', tasks: ['Design Twitter/YouTube', 'Mock interviews'] },
                    { week: 'Week 7-8', focus: 'Final Prep & Mock Interviews', tasks: ['Full mock interviews', 'Review weak areas', 'Company-specific prep'] },
                  ].map((stage, idx) => (
                    <div key={idx} className="p-6 bg-[#131b2e] rounded-lg border border-[#adc6ff]/20 hover:border-[#adc6ff]/40 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4d8eff] to-[#adc6ff] text-white flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-[#adc6ff] uppercase tracking-widest mb-1">{stage.week}</p>
                          <h4 className="text-lg font-bold text-[#dae2fd] mb-2">{stage.focus}</h4>
                          <ul className="space-y-1">
                            {stage.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="text-sm text-[#c2c6d6] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="col-span-12">
              <div className="bg-gradient-to-r from-[#4edea3]/10 to-[#adc6ff]/10 rounded-xl p-8 border border-[#4edea3]/20">
                <h3 className="text-lg font-bold text-[#dae2fd] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4edea3]">recommendation</span>
                  AI Recommendation
                </h3>
                <p className="text-[#c2c6d6]">{intelligence.recommendation}</p>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="col-span-12">
            <div className="bg-[#171f33] rounded-xl p-12 border border-slate-800/20 text-center">
              <span className="material-symbols-outlined text-4xl text-[#adc6ff] animate-spin block mb-4">autorenew</span>
              <p className="text-[#b9c8de]">Fetching company intelligence...</p>
            </div>
          </div>
        )}

        {!intelligence && !loading && (
          <div className="col-span-12">
            <div className="bg-[#171f33] rounded-xl p-12 border border-slate-800/20 text-center">
              <span className="material-symbols-outlined text-6xl text-[#adc6ff] opacity-50 block mb-4">business</span>
              <p className="text-[#b9c8de] text-lg">Select a company to view detailed intelligence and preparation roadmap</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
