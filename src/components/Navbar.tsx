import React from 'react';
import { TabType } from '../types';
import { BookOpen, CheckCircle2, Compass, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            ∑
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
            중1 통계 대푯값 탐험대
          </span>
        </div>

        {/* Zone 2: Navigation Links / Segmented Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onTabChange('concept')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'concept'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>개념 학습</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>개념 확인 문제</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('scenario')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'scenario'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>실생활 탐구</span>
          </button>
        </nav>

        {/* Zone 3: Primary Utility Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            title="기본값으로 새로고침"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">처음으로</span>
          </button>
        </div>
      </div>
    </header>
  );
};
