'use client';

import { useState, useEffect } from 'react';
import { generateRoadmap } from '@/lib/api';

export default function Roadmaps() {
  const [roadmapMode, setRoadmapMode] = useState(null); // 'ai' or 'prebuilt'
  const [targetRole, setTargetRole] = useState('');
  const [timeline, setTimeline] = useState(8);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [availableRoadmaps, setAvailableRoadmaps] = useState([]);
  const [selectedRoadmapImage, setSelectedRoadmapImage] = useState(null);
  const [selectedRoadmapTitle, setSelectedRoadmapTitle] = useState(null);
  const [searchRoadmaps, setSearchRoadmaps] = useState('');

  // Available roadmaps with their file mappings
  const roadmapsList = [
    { title: 'Frontend Roadmap', file: 'frontend' },
    { title: 'Backend Roadmap', file: 'backend' },
    { title: 'DevOps Roadmap', file: 'devops' },
    { title: 'Full Stack Roadmap', file: 'full-stack' },
    { title: 'Python Roadmap', file: 'python' },
    { title: 'JavaScript Roadmap', file: 'javascript' },
    { title: 'TypeScript Roadmap', file: 'typescript' },
    { title: 'React Roadmap', file: 'react' },
    { title: 'Node.js Roadmap', file: 'nodejs' },
    { title: 'Next.js Roadmap', file: 'nextjs' },
    { title: 'Vue Roadmap', file: 'vue' },
    { title: 'Angular Roadmap', file: 'angular' },
    { title: 'React Native Roadmap', file: 'react-native' },
    { title: 'Flutter Roadmap', file: 'flutter' },
    { title: 'Android Roadmap', file: 'android' },
    { title: 'iOS Roadmap', file: 'ios' },
    { title: 'AWS Roadmap', file: 'aws' },
    { title: 'Docker Roadmap', file: 'docker' },
    { title: 'Kubernetes Roadmap', file: 'kubernetes' },
    { title: 'Linux Roadmap', file: 'linux' },
    { title: 'Git and GitHub Roadmap', file: 'git-github' },
    { title: 'System Design Roadmap', file: 'system-design' },
    { title: 'Data Structures and Algorithms Roadmap', file: 'datastructures-and-algorithms' },
    { title: 'Computer Science Roadmap', file: 'computer-science' },
    { title: 'Machine Learning Roadmap', file: 'machine-learning' },
    { title: 'AI Engineer Roadmap', file: 'ai-engineer' },
    { title: 'Data Engineer Roadmap', file: 'data-engineer' },
    { title: 'Data Analyst Roadmap', file: 'data-analyst' },
    { title: 'Product Manager Roadmap', file: 'product-manager' },
    { title: 'Engineering Manager Roadmap', file: 'engineering-manager' },
    { title: 'QA Roadmap', file: 'qa' },
    { title: 'Software Architect Roadmap', file: 'software-architect' },
    { title: 'Java Roadmap', file: 'java' },
    { title: 'C++ Roadmap', file: 'cpp' },
    { title: 'Go Roadmap', file: 'golang' },
    { title: 'Rust Roadmap', file: 'rust' },
    { title: 'PHP Roadmap', file: 'php' },
    { title: 'Laravel Roadmap', file: 'laravel' },
    { title: 'Django Roadmap', file: 'django' },
    { title: 'Spring Boot Roadmap', file: 'spring-boot' },
    { title: 'GraphQL Roadmap', file: 'graphql' },
    { title: 'API Design Roadmap', file: 'api-design' },
    { title: 'MongoDB Roadmap', file: 'mongodb' },
    { title: 'PostgreSQL Roadmap', file: 'postgresql-dba' },
    { title: 'Redis Roadmap', file: 'redis' },
    { title: 'SQL Roadmap', file: 'sql' },
    { title: 'Terraform Roadmap', file: 'terraform' },
    { title: 'Cyber Security Roadmap', file: 'cyber-security' },
    { title: 'DevSecOps Roadmap', file: 'devops' },
    { title: 'Blockchain Roadmap', file: 'blockchain' },
    { title: 'UX Design Roadmap', file: 'ux-design' },
    { title: 'HTML Roadmap', file: 'html' },
    { title: 'CSS Roadmap', file: 'css' },
  ];

  useEffect(() => {
    setAvailableRoadmaps(roadmapsList);
  }, []);

  const filteredRoadmaps = availableRoadmaps.filter((rm) =>
    rm.title.toLowerCase().includes(searchRoadmaps.toLowerCase())
  );

  const commonRoles = [
    'Senior Backend Engineer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Solutions Architect',
    'Data Engineer',
    'ML Engineer',
    'Frontend Engineer',
    'Cloud Architect',
  ];

  const handleGenerateRoadmap = async () => {
    if (!targetRole.trim()) {
      setError('Please select or enter a role');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateRoadmap(targetRole, timeline);
      setRoadmapData(result);
      setCompletedTasks([]);
    } catch (err) {
      setError(`Failed to generate roadmap: ${err.message}`);
      setRoadmapData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrebuiltRoadmap = (roadmap) => {
    setSelectedRoadmapTitle(roadmap.title);
    setSelectedRoadmapImage(`/roadmaps/${roadmap.file}.png`);
  };

  const handleCloseRoadmapImage = () => {
    setSelectedRoadmapImage(null);
    setSelectedRoadmapTitle(null);
  };

  const toggleTaskCompletion = (weekIdx, taskIdx) => {
    const taskKey = `${weekIdx}-${taskIdx}`;
    setCompletedTasks((prev) =>
      prev.includes(taskKey) ? prev.filter((t) => t !== taskKey) : [...prev, taskKey]
    );
  };

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">
          Adaptive Roadmaps
        </h1>
        <p className="text-tertiary body-md">Dynamic learning paths updated by AI based on your progress.</p>
      </header>

      {!roadmapData ? (
        // Mode Selection & Generation
        <div className="space-y-6">
          {/* Generation Card */}
          <div className="bg-surface-container-low rounded-xl p-8">
            <h2 className="text-lg font-bold text-on-surface mb-6">Generate Your Personalized Roadmap</h2>

            <div className="space-y-6">
              {/* Target Role */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Target Role
                </label>

                {/* Quick Select */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {commonRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setTargetRole(role);
                        setError(null);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        targetRole === role
                          ? 'bg-primary text-surface'
                          : 'bg-surface-container border border-outline text-on-surface hover:border-primary'
                      }`}
                    >
                      {role.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Or enter a custom role..."
                  className="w-full px-4 py-2 rounded-lg bg-surface-container border border-outline text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-3">
                  Timeline: <span className="font-bold text-primary">{timeline} weeks</span>
                </label>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={timeline}
                  onChange={(e) => setTimeline(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                  <span>4 weeks (Fast)</span>
                  <span>24 weeks (Comprehensive)</span>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerateRoadmap}
                disabled={loading || !targetRole.trim()}
                className="w-full px-6 py-3 rounded-lg bg-primary text-surface font-semibold hover:bg-primary-container disabled:opacity-50 transition-all"
              >
                {loading ? 'Generating...' : 'Generate Roadmap'}
              </button>
            </div>
          </div>

          {/* Pre-built Examples */}
          <div className="bg-surface-container rounded-xl p-8">
            <h2 className="text-lg font-bold text-on-surface mb-4">Popular Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Backend Systems', desc: 'Distributed systems, databases, APIs' },
                { title: 'Cloud Infrastructure', desc: 'AWS, Kubernetes, microservices' },
                { title: 'Full Stack', desc: 'Frontend, backend, DevOps skills' },
                { title: 'Data Engineering', desc: 'Big data, ETL, analytics' },
              ].map((path) => (
                <div key={path.title} className="bg-surface-container-low rounded-lg p-4 hover:bg-surface-container-highest transition-all cursor-pointer">
                  <p className="font-semibold text-on-surface">{path.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1">{path.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Roadmap Display
        <div className="space-y-6">
          {/* Header with Stats */}
          <div className="bg-surface-container-low rounded-xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-on-surface">{roadmapData.role}</h2>
              <p className="text-sm text-on-surface-variant">
                {roadmapData.timeline_weeks} weeks • {roadmapData.milestones?.length || 0} milestones
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-on-surface-variant">Overall Progress</p>
              <p className="text-2xl font-bold text-primary">
                {Math.round((completedTasks.length / (roadmapData.milestones?.reduce((acc, m) => acc + (m.tasks?.length || 0), 0) || 1)) * 100)}%
              </p>
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="space-y-4">
            {roadmapData.milestones?.map((milestone, weekIdx) => (
              <div key={weekIdx} className="bg-surface-container rounded-xl p-6 border-l-4 border-primary">
                {/* Week Header */}
                <div className="mb-4 pb-4 border-b border-outline">
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-primary font-bold">
                      {milestone.week}
                    </span>
                    {milestone.focus}
                  </h3>
                </div>

                {/* Tasks */}
                <div className="space-y-2">
                  {milestone.tasks?.map((task, taskIdx) => {
                    const taskKey = `${weekIdx}-${taskIdx}`;
                    const isCompleted = completedTasks.includes(taskKey);

                    return (
                      <div
                        key={taskIdx}
                        onClick={() => toggleTaskCompletion(weekIdx, taskIdx)}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          isCompleted
                            ? 'bg-primary-container/30'
                            : 'bg-surface-container-highest hover:bg-surface-container-highest'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => {}}
                          className="mt-1 w-5 h-5 rounded accent-primary cursor-pointer"
                        />
                        <span
                          className={`text-sm ${
                            isCompleted
                              ? 'line-through text-on-surface-variant'
                              : 'text-on-surface'
                          }`}
                        >
                          {task}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setRoadmapData(null)}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-surface font-semibold hover:bg-primary-container transition-all"
            >
              Generate New Roadmap
            </button>
            <button
              onClick={() => {
                // Export or save roadmap
                const dataStr = JSON.stringify(roadmapData, null, 2);
                const element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr));
                element.setAttribute('download', `roadmap-${roadmapData.role}.json`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="px-6 py-3 rounded-lg border-2 border-outline text-on-surface font-semibold hover:bg-surface-container-low transition-all"
            >
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
