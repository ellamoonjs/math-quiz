import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { ConceptSection } from './components/ConceptSection';
import { QuizSection } from './components/QuizSection';
import { ScenarioSection } from './components/ScenarioSection';
import { BookOpen, CheckCircle2, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('concept');

  const handleReset = () => {
    setActiveTab('concept');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Noto_Sans_KR',sans-serif]">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {/* Navigation Step Indicator */}
        <div className="py-4 border-b border-slate-200/80 mb-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => handleTabChange('concept')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'concept'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeTab === 'concept' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                1
              </span>
              <span>대푯값 개념 학습</span>
            </button>

            <span className="text-slate-300 mx-2">──</span>

            <button
              type="button"
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                2
              </span>
              <span>개념 확인 퀴즈 (5문항)</span>
            </button>

            <span className="text-slate-300 mx-2">──</span>

            <button
              type="button"
              onClick={() => handleTabChange('scenario')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeTab === 'scenario'
                  ? 'text-indigo-600 font-bold'
                  : 'hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeTab === 'scenario' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                3
              </span>
              <span>실생활 상황 탐구 (3가지)</span>
            </button>
          </div>
        </div>

        {/* Tab Sections */}
        {activeTab === 'concept' && <ConceptSection />}
        {activeTab === 'quiz' && <QuizSection />}
        {activeTab === 'scenario' && <ScenarioSection />}

        {/* Next Step Forward Navigation */}
        <div className="py-8 border-t border-slate-200 flex items-center justify-between">
          {activeTab === 'concept' && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => handleTabChange('quiz')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all hover:translate-x-0.5"
              >
                <span>개념을 다 익혔다면? 실력 확인 퀴즈 풀러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleTabChange('concept')}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                ← 이전: 개념 다시 복습하기
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('scenario')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all hover:translate-x-0.5"
              >
                <span>다음: 실생활 탐구로 넘어가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === 'scenario' && (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleTabChange('quiz')}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                ← 이전: 퀴즈 다시 확인하기
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('concept')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
              >
                <span>처음 개념으로 돌아가기</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">중학교 1학년 수학 교육용 웹앱</span>
            <span>·</span>
            <span>통계 단원: 대푯값 (평균, 중앙값, 최빈값)</span>
          </div>
          <div>
            직관적인 시각화와 인터랙티브 시뮬레이션으로 수학의 원리를 즐겁게 탐구해요.
          </div>
        </div>
      </footer>
    </div>
  );
}
