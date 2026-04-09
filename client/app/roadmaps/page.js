'use client';

import { useState, useEffect } from 'react';
import { safeApiFetch, API_URLS } from '@/lib/api';

export default function Roadmaps() {
  const [mode, setMode] = useState(null); // 'ai', 'roadmaps', 'practices'
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [selectedPdfTitle, setSelectedPdfTitle] = useState(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [searchRoadmaps, setSearchRoadmaps] = useState('');
  const [searchPractices, setSearchPractices] = useState('');
  const [availableRoadmaps, setAvailableRoadmaps] = useState([]);
  const [availablePractices, setAvailablePractices] = useState([]);

  useEffect(() => {
    // Format filename to readable title
    const formatTitle = (filename) => {
      return filename
        .replace(/\.pdf$/, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    // List of roadmaps from public/pdfs/roadmaps/
    const roadmaps = [
      'ai-agents', 'ai-data-scientist', 'ai-engineer', 'ai-red-teaming',
      'android', 'angular', 'api-design', 'api-security-best-practices',
      'aspnet-core', 'aws', 'aws-best-practices', 'backend', 'backend-beginner',
      'backend-performance-best-practices', 'bi-analyst', 'blockchain',
      'cloudflare', 'code-review', 'code-review-best-practices', 'computer-science', 'cpp', 'css', 'cyber-security',
      'data-analyst', 'data-engineer', 'datastructures-and-algorithms',
      'design-system', 'devops', 'devops-beginner', 'devrel', 'docker',
      'engineering-manager', 'flutter', 'frontend', 'frontend-beginner',
      'frontend-performance-best-practices', 'full-stack', 'game-developer',
      'git-github', 'git-github-beginner', 'golang', 'graphql', 'html',
      'ios', 'java', 'javascript', 'kotlin', 'kubernetes', 'laravel',
      'linux', 'machine-learning', 'mlops', 'mongodb', 'nextjs', 'nodejs',
      'php', 'postgresql-dba', 'product-manager', 'prompt-engineering',
      'python', 'qa', 'react', 'react-native', 'redis', 'rust',
      'server-side-game-developer', 'shell-bash', 'software-architect',
      'software-design-architecture', 'spring-boot', 'sql', 'swift-ui',
      'system-design', 'technical-writer', 'terraform', 'typescript',
      'ux-design', 'vue'
    ];

    // List of best practices from public/pdfs/best-practices/
    const practices = [
      'api-security',
      'aws',
      'backend-performance',
      'code-review',
      'frontend-performance'
    ];

    setAvailableRoadmaps(
      roadmaps.map(name => ({
        title: formatTitle(name),
        filename: name,
        path: `/pdfs/roadmaps/${name}.pdf`
      }))
    );

    setAvailablePractices(
      practices.map(name => ({
        title: `${formatTitle(name)} Best Practices`,
        filename: name,
        path: `/pdfs/best-practices/${name}.pdf`
      }))
    );
  }, []);

  const filteredRoadmaps = availableRoadmaps.filter((rm) =>
    rm.title.toLowerCase().includes(searchRoadmaps.toLowerCase())
  );

  const filteredPractices = availablePractices.filter((pr) =>
    pr.title.toLowerCase().includes(searchPractices.toLowerCase())
  );

  const generateAIRoadmap = async () => {
    if (!role.trim()) return;
    setLoading(true);
    try {
      const data = await safeApiFetch(`${API_URLS.PYTHON}/planner/generate`, {
        method: 'POST',
        body: JSON.stringify({ target_role: role, current_level: 'Mid-Level', weeks: 8 }),
      });
      if (data) {
        setRoadmapData(data);
      } else {
        throw new Error('API error');
      }
    } catch (err) {
      setRoadmapData({
        weeks: [
          { milestone: 'Learn Fundamentals', tasks: ['Study Core Concepts', 'Practice Basics', 'Build Mini Projects'] },
          { milestone: 'Master Key Skills', tasks: ['Advanced Topics', 'Real-world Practice', 'Code Review'] },
          { milestone: 'Practice Challenges', tasks: ['Algorithm Practice', 'System Design', 'Mock Interviews'] },
          { milestone: 'Deep Dive Architecture', tasks: ['Microservices', 'API Design', 'Scalability'] },
          { milestone: 'Leadership Skills', tasks: ['Communication', 'Team Collaboration', 'Mentoring'] },
          { milestone: 'Interview Prep', tasks: ['Mock Interviews', 'Tech Questions', 'Behavioral'] },
          { milestone: 'Portfolio Projects', tasks: ['Build Real Project', 'Open Source', 'Document Code'] },
          { milestone: 'Final Preparation', tasks: ['Review Weak Areas', 'Final Mocks', 'Company Research'] },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPdf = (pdf) => {
    setSelectedPdfTitle(pdf.title);
    setSelectedPdfUrl(pdf.path);
  };

  const handleClosePdf = () => {
    setSelectedPdfUrl(null);
    setSelectedPdfTitle(null);
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-[#dae2fd] mb-2">Adaptive Roadmaps</h1>
        <p className="text-[#b9c8de]">Choose from 73+ learning roadmaps, 5 best practices guides, or generate personalized paths with AI</p>
      </header>

      {!selectedPdfUrl && !roadmapData && !mode && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setMode('ai')}
            className="bg-[#171f33] hover:bg-[#1a2236] rounded-xl p-8 border-2 border-[#adc6ff]/20 hover:border-[#adc6ff]/50 transition-all text-left group"
          >
            <span className="material-symbols-outlined text-5xl text-[#4edea3] mb-4 block group-hover:scale-110 transition-transform">
              auto_awesome
            </span>
            <h3 className="text-2xl font-bold text-[#dae2fd] mb-2">AI-Generated</h3>
            <p className="text-[#b9c8de]">Personalized learning paths</p>
          </button>

          <button
            onClick={() => setMode('roadmaps')}
            className="bg-[#171f33] hover:bg-[#1a2236] rounded-xl p-8 border-2 border-[#adc6ff]/20 hover:border-[#adc6ff]/50 transition-all text-left group"
          >
            <span className="material-symbols-outlined text-5xl text-[#4d8eff] mb-4 block group-hover:scale-110 transition-transform">
              maps
            </span>
            <h3 className="text-2xl font-bold text-[#dae2fd] mb-2">Roadmaps</h3>
            <p className="text-[#b9c8de]">73+ learning PDFs</p>
          </button>

          <button
            onClick={() => setMode('practices')}
            className="bg-[#171f33] hover:bg-[#1a2236] rounded-xl p-8 border-2 border-[#adc6ff]/20 hover:border-[#adc6ff]/50 transition-all text-left group"
          >
            <span className="material-symbols-outlined text-5xl text-[#4edea3] mb-4 block group-hover:scale-110 transition-transform">
              verified
            </span>
            <h3 className="text-2xl font-bold text-[#dae2fd] mb-2">Best Practices</h3>
            <p className="text-[#b9c8de]">5 industry guides</p>
          </button>
        </div>
      )}

      {mode === 'ai' && !roadmapData && !selectedPdfUrl && (
        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20 space-y-6">
              <h2 className="text-xl font-bold text-[#dae2fd]">Generate Your Roadmap</h2>

              <div>
                <label className="block text-sm font-bold text-[#c2c6d6] uppercase tracking-widest mb-2">Target Role</label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Senior Software Architect"
                  className="w-full p-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]"
                />
              </div>

              <button
                onClick={generateAIRoadmap}
                disabled={!role.trim() || loading}
                className="w-full py-3 bg-[#4edea3] hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-lg transition-all"
              >
                {loading ? 'Generating...' : 'Create Roadmap'}
              </button>

              <button
                onClick={() => setMode(null)}
                className="w-full py-2 border border-[#adc6ff] text-[#adc6ff] hover:bg-[#adc6ff]/10 font-bold rounded-lg transition-all"
              >
                ← Back
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-[#171f33] rounded-xl p-12 border border-slate-800/20 text-center">
              <span className="material-symbols-outlined text-6xl text-[#adc6ff] opacity-50 block mb-4">map</span>
              <p className="text-[#b9c8de] text-lg">Enter your target role and generate a personalized roadmap</p>
            </div>
          </div>
        </div>
      )}

      {mode === 'roadmaps' && !selectedPdfUrl && (
        <div className="space-y-6 mb-8">
          <div className="bg-[#171f33] rounded-xl p-6 border border-slate-800/20">
            <h2 className="text-xl font-bold text-[#dae2fd] mb-4">Browse Learning Roadmaps (PDFs)</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={searchRoadmaps}
                onChange={(e) => setSearchRoadmaps(e.target.value)}
                placeholder="Search roadmaps... (e.g., Frontend, React, DevOps)"
                className="flex-1 px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]"
              />
              <button
                onClick={() => setMode(null)}
                className="px-6 py-3 border border-[#adc6ff] text-[#adc6ff] hover:bg-[#adc6ff]/10 font-bold rounded-lg transition-all whitespace-nowrap"
              >
                ← Back
              </button>
            </div>
            <p className="text-xs text-[#b9c8de] mt-2">Showing {filteredRoadmaps.length} roadmaps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoadmaps.map((roadmap) => (
              <button
                key={roadmap.filename}
                onClick={() => handleSelectPdf(roadmap)}
                className="group bg-[#171f33] hover:bg-[#1a2236] rounded-xl p-6 border-2 border-[#adc6ff]/20 hover:border-[#adc6ff]/50 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-[#4d8eff] text-3xl group-hover:scale-110 transition-transform">
                    description
                  </span>
                  <span className="material-symbols-outlined text-[#b9c8de] group-hover:text-[#adc6ff] transition-colors">
                    download
                  </span>
                </div>
                <h3 className="font-semibold text-[#dae2fd] group-hover:text-[#adc6ff] transition-colors mb-1">
                  {roadmap.title}
                </h3>
                <p className="text-xs text-[#b9c8de]">Click to view PDF</p>
              </button>
            ))}
          </div>

          {filteredRoadmaps.length === 0 && (
            <div className="text-center py-12 bg-[#171f33] rounded-xl border border-slate-800/20">
              <p className="text-[#b9c8de]">No roadmaps found</p>
            </div>
          )}
        </div>
      )}

      {mode === 'practices' && !selectedPdfUrl && (
        <div className="space-y-6 mb-8">
          <div className="bg-[#171f33] rounded-xl p-6 border border-slate-800/20">
            <h2 className="text-xl font-bold text-[#dae2fd] mb-4">Browse Best Practices Guides (PDFs)</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={searchPractices}
                onChange={(e) => setSearchPractices(e.target.value)}
                placeholder="Search best practices... (e.g., API, AWS, Performance)"
                className="flex-1 px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-lg text-[#dae2fd] placeholder-slate-500 focus:outline-none focus:border-[#adc6ff]"
              />
              <button
                onClick={() => setMode(null)}
                className="px-6 py-3 border border-[#adc6ff] text-[#adc6ff] hover:bg-[#adc6ff]/10 font-bold rounded-lg transition-all whitespace-nowrap"
              >
                ← Back
              </button>
            </div>
            <p className="text-xs text-[#b9c8de] mt-2">Showing {filteredPractices.length} guides</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPractices.map((practice) => (
              <button
                key={practice.filename}
                onClick={() => handleSelectPdf(practice)}
                className="group bg-[#171f33] hover:bg-[#1a2236] rounded-xl p-6 border-2 border-[#adc6ff]/20 hover:border-[#adc6ff]/50 transition-all text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="material-symbols-outlined text-[#4edea3] text-3xl group-hover:scale-110 transition-transform">
                    verified
                  </span>
                  <span className="material-symbols-outlined text-[#b9c8de] group-hover:text-[#adc6ff] transition-colors">
                    download
                  </span>
                </div>
                <h3 className="font-semibold text-[#dae2fd] group-hover:text-[#adc6ff] transition-colors mb-1">
                  {practice.title}
                </h3>
                <p className="text-xs text-[#b9c8de]">Click to view PDF</p>
              </button>
            ))}
          </div>

          {filteredPractices.length === 0 && (
            <div className="text-center py-12 bg-[#171f33] rounded-xl border border-slate-800/20">
              <p className="text-[#b9c8de]">No best practices found</p>
            </div>
          )}
        </div>
      )}

      {selectedPdfUrl && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1419] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-slate-800/50 flex flex-col">
            <div className="sticky top-0 bg-[#171f33] p-6 border-b border-slate-800/20 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#dae2fd]">{selectedPdfTitle}</h2>
              <button
                onClick={handleClosePdf}
                className="material-symbols-outlined text-3xl text-[#b9c8de] hover:text-[#dae2fd] cursor-pointer"
              >
                close
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-[#131b2e]">
              <embed
                src={`${selectedPdfUrl}#toolbar=0&view=FitH`}
                type="application/pdf"
                className="w-full rounded-lg border border-[#adc6ff]/20"
                style={{ height: '600px', border: 'none' }}
              />
            </div>

            <div className="border-t border-slate-800/20 p-6 flex gap-3 justify-end bg-[#171f33]">
              <button
                onClick={handleClosePdf}
                className="px-6 py-2 rounded-lg border-2 border-[#adc6ff] text-[#adc6ff] hover:bg-[#adc6ff]/10 font-semibold transition-all"
              >
                Close
              </button>
              <a
                href={selectedPdfUrl}
                download
                className="px-6 py-2 rounded-lg bg-[#4edea3] hover:brightness-110 text-white font-semibold transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {roadmapData && mode === 'ai' && (
        <div className="space-y-8">
          <div className="bg-[#171f33] rounded-xl p-8 border border-slate-800/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#dae2fd]">{role}</h2>
                <p className="text-[#b9c8de]">8-week personalized roadmap</p>
              </div>
              <button
                onClick={() => {
                  setRoadmapData(null);
                  setRole('');
                  setMode(null);
                }}
                className="px-6 py-2 bg-[#4edea3] hover:brightness-110 text-white font-bold rounded-lg transition-all"
              >
                Generate New
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {roadmapData.weeks?.map((week, idx) => (
              <div key={idx} className="p-6 bg-[#171f33] rounded-lg border border-[#adc6ff]/20 hover:border-[#adc6ff]/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4d8eff] to-[#adc6ff] text-white flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#dae2fd] mb-3">{week.milestone}</h4>
                    <ul className="space-y-2">
                      {(week.tasks || []).map((task, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-2 text-[#c2c6d6]">
                          <input type="checkbox" className="rounded bg-[#222a3d] border-slate-700" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
