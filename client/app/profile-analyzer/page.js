'use client';

import { useState } from 'react';
import { safeApiFetch, API_URLS } from '@/lib/api';

export default function ProfileAnalyzer() {
  const [cgpa, setCgpa] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [experience, setExperience] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeProfile = async () => {
    if (!cgpa || !skills || !projects || !experience) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const skillArray = skills.split(',').map(s => s.trim());
      const data = await safeApiFetch(`${API_URLS.PYTHON}/analyze/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cgpa: parseFloat(cgpa),
          skills: skillArray,
          projects: parseInt(projects),
          years_experience: parseFloat(experience),
          target_role: targetRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
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
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#dae2fd] mb-2">Smart Profile Analyzer</h1>
        <p className="text-[#b9c8de]">Analyze your profile and get placement probability predictions</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20 space-y-6 sticky top-8">
            <h2 className="text-xl font-bold text-[#dae2fd]">Your Profile</h2>

            <div>
              <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">CGPA</label>
              <input value={cgpa} onChange={(e) => setCgpa(e.target.value)} type="number" placeholder="e.g., 8.5" step="0.1" min="0" max="10" className="w-full p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]" />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Skills (comma separated)</label>
              <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Python, DSA, React, SQL" className="w-full h-20 p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]" />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Projects Completed</label>
              <input value={projects} onChange={(e) => setProjects(e.target.value)} type="number" placeholder="e.g., 5" min="0" className="w-full p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]" />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Years of Experience</label>
              <input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" placeholder="e.g., 2" step="0.5" min="0" className="w-full p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]" />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Target Role</label>
              <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="w-full p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] focus:outline-none focus:border-[#adc6ff]">
                <option>Software Engineer</option>
                <option>Product Manager</option>
                <option>Data Scientist</option>
                <option>DevOps Engineer</option>
              </select>
            </div>

            <button onClick={analyzeProfile} disabled={loading || !cgpa || !skills || !projects || !experience} className="w-full py-3 bg-[#4edea3] hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">{loading ? 'autorenew' : 'assessment'}</span>
              {loading ? 'Analyzing...' : 'Analyze Profile'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Placement Probability */}
            <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
              <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">trending_up</span>
                Placement Probability
              </h3>

              <div className="mb-6">
                <div className="flex items-end justify-between mb-2">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4d8eff] to-[#4edea3]">{analysis.placement_probability}%</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${analysis.placement_probability > 80 ? 'bg-[#4edea3]/20 text-[#4edea3]' : analysis.placement_probability > 60 ? 'bg-[#adc6ff]/20 text-[#adc6ff]' : 'bg-red-500/20 text-red-400'}`}>
                    {analysis.tier}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#131b2e] rounded-full h-3 overflow-hidden border border-slate-700">
                  <div style={{ width: `${analysis.placement_probability}%` }} className="h-full bg-gradient-to-r from-[#4d8eff] to-[#4edea3] transition-all duration-500"></div>
                </div>
              </div>

              <p className="text-[#b9c8de] mb-4">{analysis.message}</p>
              <p className="text-sm text-[#adc6ff] font-semibold">Next: {analysis.next_milestone}</p>
            </div>

            {/* Skill Gap Heatmap */}
            <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
              <h3 className="text-lg font-bold text-[#dae2fd] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#adc6ff]">grid_3x3</span>
                Skill Gap Analysis
              </h3>

              <div className="space-y-2 mb-6">
                {analysis.skill_gap && analysis.skill_gap.map((gap, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#131b2e] rounded-lg border border-red-500/20">
                    <span className="material-symbols-outlined text-red-400 text-sm">close</span>
                    <span className="text-[#dae2fd]">{gap}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-2 bg-[#4d8eff]/20 hover:bg-[#4d8eff]/30 text-[#4d8eff] font-bold rounded-lg transition-all">
                Generate Learning Path
              </button>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-[#4edea3]/10 to-[#adc6ff]/10 rounded-xl p-8 border border-[#4edea3]/20">
              <h3 className="text-lg font-bold text-[#dae2fd] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3]">lightbulb</span>
                AI Recommendations
              </h3>

              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-[#4edea3] font-bold">→</span>
                  <span className="text-[#dae2fd]">Focus on System Design and DSA fundamentals</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4edea3] font-bold">→</span>
                  <span className="text-[#dae2fd]">Build 2 more full-stack projects for portfolio</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#4edea3] font-bold">→</span>
                  <span className="text-[#dae2fd]">Join open-source to gain production experience</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysis && !loading && (
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-[#171f33] rounded-xl p-12 border border-slate-800/20 text-center">
              <span className="material-symbols-outlined text-6xl text-[#adc6ff] opacity-50 block mb-4">person</span>
              <p className="text-[#b9c8de] text-lg">Fill in your profile details to get AI-powered analysis and recommendations</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
