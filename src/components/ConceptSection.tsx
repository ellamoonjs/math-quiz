import React, { useState } from 'react';
import { calculateStatistics } from '../utils/statistics';
import {
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  TrendingUp,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

const PRESETS = [
  {
    name: '기본: 5명의 수학 점수',
    data: [70, 80, 85, 85, 90],
    desc: '홀수 개 자료 & 최빈값이 1개 있는 대표적인 예시예요.',
  },
  {
    name: '짝수 개: 6명의 수학 점수',
    data: [60, 70, 75, 85, 90, 100],
    desc: '자료가 짝수 개일 때 중앙값을 어떻게 구하는지 확인해 보세요!',
  },
  {
    name: '극단값 포함: 10점이 섞였을 때',
    data: [10, 80, 85, 85, 90],
    desc: '한 명의 점수가 너무 낮아 평균이 뚝 떨어지는 현상을 관찰해요.',
  },
  {
    name: '최빈값 2개 (쌍봉)',
    data: [70, 70, 80, 90, 90],
    desc: '가장 많이 나온 숫자가 2개 이상일 수도 있어요!',
  },
  {
    name: '모두 다른 점수 (최빈값 없음)',
    data: [60, 70, 80, 90, 100],
    desc: '모든 자료의 빈도가 같으면 최빈값이 없다고 말해요.',
  },
];

export const ConceptSection: React.FC = () => {
  const [data, setData] = useState<number[]>([70, 80, 85, 85, 90]);
  const [newNumInput, setNewNumInput] = useState<string>('');
  const [activeConceptTab, setActiveConceptTab] = useState<'all' | 'mean' | 'median' | 'mode'>('all');
  const [outlierSliderValue, setOutlierSliderValue] = useState<number>(90);
  const [isSliderActive, setIsSliderActive] = useState<boolean>(false);

  // When slider is active, override last element with slider value
  const currentData = isSliderActive
    ? [...data.slice(0, Math.max(1, data.length - 1)), outlierSliderValue]
    : data;

  const stats = calculateStatistics(currentData);

  const handleAddNumber = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(newNumInput.trim(), 10);
    if (!isNaN(val) && val >= 0 && val <= 1000) {
      if (data.length >= 10) {
        alert('체험을 위해 숫자는 최대 10개까지 추가할 수 있습니다.');
        return;
      }
      setData([...data, val]);
      setNewNumInput('');
    }
  };

  const handleRemoveNumber = (index: number) => {
    if (data.length <= 3) {
      alert('대푯값을 탐구하기 위해 최소 3개 이상의 숫자가 필요해요.');
      return;
    }
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  const handlePresetSelect = (presetData: number[]) => {
    setData(presetData);
    setIsSliderActive(false);
    setOutlierSliderValue(presetData[presetData.length - 1]);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Hero Intro */}
      <section className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-100 text-xs sm:text-sm font-medium">
            <span>중1 수학 8단원 통계</span>
            <span aria-hidden="true">·</span>
            <span>대푯값(Representative Value)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            자료 전체의 특징을 하나의 숫자로! 대푯값 3총사
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            우리 반 학생들의 키, 수학 시험 점수처럼 수많은 자료(변량)가 있을 때, 그 자료 전체의 중심적인 성질이나 특징을 딱 하나의 수로 나타낸 것을{' '}
            <strong className="text-white underline decoration-amber-300 decoration-2 underline-offset-4">대푯값</strong>이라고 해요.
            가장 대표적인 3가지 친구인 <span className="font-semibold text-amber-200">평균</span>,{' '}
            <span className="font-semibold text-emerald-200">중앙값</span>,{' '}
            <span className="font-semibold text-pink-200">최빈값</span>을 만나볼까요?
          </p>
        </div>

        {/* Decorative subtle background graphics */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-12 top-6 text-white/20 text-8xl font-black select-none pointer-events-none">
          📊
        </div>
      </section>

      {/* Concept Quick Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              01. 대푯값 3총사의 핵심 정의
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              각 대푯값이 무엇을 의미하고 어떻게 계산하는지 확인해 보세요.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveConceptTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeConceptTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 보기
            </button>
            <button
              type="button"
              onClick={() => setActiveConceptTab('mean')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeConceptTab === 'mean'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. 평균 (Mean)
            </button>
            <button
              type="button"
              onClick={() => setActiveConceptTab('median')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeConceptTab === 'median'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. 중앙값 (Median)
            </button>
            <button
              type="button"
              onClick={() => setActiveConceptTab('mode')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeConceptTab === 'mode'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. 최빈값 (Mode)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Mean Card */}
          {(activeConceptTab === 'all' || activeConceptTab === 'mean') && (
            <div className="bg-white rounded-xl border-2 border-indigo-100 p-5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    가장 친숙한 대푯값
                  </span>
                  <span className="text-xl">⚖️</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  1. 평균 (Mean)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  "모두 다 모아서 공평하게 똑같이 나누기!"
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 space-y-1.5 mb-4">
                  <div className="font-semibold text-indigo-900">구하는 방법:</div>
                  <div className="font-mono bg-white p-2 rounded border border-slate-200 text-center font-bold text-indigo-600 text-sm">
                    자료의 총합 ÷ 자료의 개수
                  </div>
                  <p className="text-slate-600 pt-1">
                    모든 변량의 값을 남김없이 더한 후, 전체 개수로 나누어 구해요.
                  </p>
                </div>
              </div>
              <div className="text-xs bg-indigo-50/70 text-indigo-900 p-3 rounded-lg border border-indigo-100">
                <span className="font-bold">💡 장점과 단점:</span>
                <p className="mt-1 text-slate-600">
                  모든 자료의 크기가 반영되지만, 엄청나게 크거나 작은 '극단값'이 있으면 크게 왜곡돼요.
                </p>
              </div>
            </div>
          )}

          {/* Median Card */}
          {(activeConceptTab === 'all' || activeConceptTab === 'median') && (
            <div className="bg-white rounded-xl border-2 border-emerald-100 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    극단값에 강한 든든이
                  </span>
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  2. 중앙값 (Median)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  "작은 순서로 줄을 세워 한가운데 콕 집기!"
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 space-y-1.5 mb-4">
                  <div className="font-semibold text-emerald-900">구하는 방법:</div>
                  <div className="font-mono bg-white p-2 rounded border border-slate-200 text-center font-bold text-emerald-600 text-sm">
                    크기 순 정렬 후 정중앙 값
                  </div>
                  <ul className="text-slate-600 list-disc list-inside space-y-0.5 pt-1">
                    <li><strong>홀수 개:</strong> 정중앙 1개의 값</li>
                    <li><strong>짝수 개:</strong> 한가운데 2개 값의 <strong>평균</strong></li>
                  </ul>
                </div>
              </div>
              <div className="text-xs bg-emerald-50/70 text-emerald-900 p-3 rounded-lg border border-emerald-100">
                <span className="font-bold">💡 장점과 단점:</span>
                <p className="mt-1 text-slate-600">
                  엉뚱하게 튀는 값(극단값)의 영향을 거의 안 받지만, 중앙 외의 다른 값들이 변해도 모를 수 있어요.
                </p>
              </div>
            </div>
          )}

          {/* Mode Card */}
          {(activeConceptTab === 'all' || activeConceptTab === 'mode') && (
            <div className="bg-white rounded-xl border-2 border-amber-100 p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                    가장 인기 있는 대세
                  </span>
                  <span className="text-xl">👑</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  3. 최빈값 (Mode)
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  "가장 자주 나타난(빈도가 제일 높은) 값!"
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 space-y-1.5 mb-4">
                  <div className="font-semibold text-amber-900">구하는 방법:</div>
                  <div className="font-mono bg-white p-2 rounded border border-slate-200 text-center font-bold text-amber-600 text-sm">
                    등장 횟수가 가장 많은 값
                  </div>
                  <p className="text-slate-600 pt-1">
                    각 자료가 몇 번 나왔는지(도수) 세어보고 가장 많은 것을 골라요.
                  </p>
                </div>
              </div>
              <div className="text-xs bg-amber-50/70 text-amber-900 p-3 rounded-lg border border-amber-100">
                <span className="font-bold">💡 특별한 특징:</span>
                <p className="mt-1 text-slate-600">
                  최빈값은 2개 이상일 수도 있고 없을 수도 있어요! 신발 사이즈나 좋아하는 색깔 조사에 딱이에요.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Live Playground: 5 students math scores */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              02. 인터랙티브 탐구 실험실: 수학 점수로 직접 확인하기
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            아래의 프리셋을 누르거나 숫자를 직접 수정해보며 평균, 중앙값, 최빈값이 어떻게 변하는지 실시간으로 관찰해 보세요!
          </p>
        </div>

        {/* Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            추천 탐구 데이터 세트
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset.data)}
                className="text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 flex items-center justify-between">
                  <span>{preset.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-500">
                    [{preset.data.join(', ')}]
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {preset.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Data Display & Management */}
        <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-700">
                현재 데이터 세트 ({currentData.length}명의 점수)
              </span>
              <p className="text-xs text-slate-500">
                숫자 카드의 ✕ 버튼을 눌러 삭제하거나 아래에서 새 점수를 추가할 수 있어요.
              </p>
            </div>

            {/* Add number input */}
            <form onSubmit={handleAddNumber} className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="1000"
                value={newNumInput}
                onChange={(e) => setNewNumInput(e.target.value)}
                placeholder="점수 입력 (0~100)"
                className="w-32 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>추가</span>
              </button>
            </form>
          </div>

          {/* Cards of Numbers (Unsorted as entered) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {currentData.map((val, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-800 shadow-2xs group"
              >
                <span className="text-xs text-slate-400 font-normal">#{idx + 1}</span>
                <span className="font-mono text-indigo-900">{val}</span>
                <span className="text-[11px] text-slate-400 font-normal">점</span>
                {!isSliderActive && currentData.length > 3 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveNumber(idx)}
                    title="이 점수 삭제"
                    className="text-slate-300 hover:text-red-500 transition-colors ml-1 p-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3 Step Visual Deep-Dive Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. MEAN VISUALIZER */}
          <div className="border border-indigo-100 rounded-xl p-5 bg-gradient-to-b from-indigo-50/40 to-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                  <span>⚖️</span>
                  <span>평균 (Mean) 구하는 과정</span>
                </span>
                <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                  {stats.meanFormatted}점
                </span>
              </div>

              {/* Step By Step Formula */}
              <div className="space-y-3 mt-3 text-xs text-slate-600">
                <div>
                  <div className="font-semibold text-slate-800">1단계: 점수 다 더하기 (총합)</div>
                  <div className="font-mono text-xs bg-white p-2 rounded border border-slate-200 mt-1 break-all text-indigo-800">
                    {currentData.join(' + ')} = <strong className="text-indigo-900">{stats.sum}</strong>점
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-slate-800">2단계: 전체 인원수로 나누기</div>
                  <div className="font-mono text-xs bg-white p-2 rounded border border-slate-200 mt-1 text-indigo-800">
                    {stats.sum} ÷ {stats.count}명 = <strong className="text-indigo-600 text-sm">{stats.meanFormatted}</strong>점
                  </div>
                </div>

                {/* Balance Beam / Water Level visual */}
                <div className="pt-2">
                  <div className="font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>수평 맞추기 (균등 분배)</span>
                    <span className="text-[11px] text-indigo-600 font-normal">기준선: {stats.meanFormatted}점</span>
                  </div>
                  <div className="h-28 bg-white border border-slate-200 rounded-lg p-2 flex items-end justify-between gap-1 relative overflow-hidden">
                    {/* Average Line */}
                    <div
                      className="absolute left-0 right-0 border-b-2 border-dashed border-indigo-500 z-10 transition-all pointer-events-none"
                      style={{
                        bottom: `${Math.min(95, Math.max(10, (stats.mean / Math.max(...currentData, 100)) * 80 + 10))}%`,
                      }}
                    >
                      <span className="absolute right-1 -top-4 text-[9px] font-bold bg-indigo-600 text-white px-1 py-0.2 rounded font-mono">
                        평균 {stats.meanFormatted}
                      </span>
                    </div>

                    {currentData.map((val, idx) => {
                      const maxVal = Math.max(...currentData, 100);
                      const heightPercent = Math.min(100, Math.max(12, (val / maxVal) * 85));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                          <span className="text-[10px] font-mono font-bold text-slate-600 mb-0.5">
                            {val}
                          </span>
                          <div
                            className="w-full bg-indigo-400/80 rounded-t transition-all duration-300"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-indigo-900 bg-indigo-50 p-2.5 rounded-lg border border-indigo-100/70">
              💬 <strong>해설:</strong> 모든 점수를 다 모아서 {stats.count}명이 사이좋게 똑같이 나누면 한 사람당 {stats.meanFormatted}점이 됩니다!
            </div>
          </div>

          {/* 2. MEDIAN VISUALIZER */}
          <div className="border border-emerald-100 rounded-xl p-5 bg-gradient-to-b from-emerald-50/40 to-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>중앙값 (Median) 구하는 과정</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                  {stats.medianFormatted}점
                </span>
              </div>

              {/* Step By Step Formula */}
              <div className="space-y-3 mt-3 text-xs text-slate-600">
                <div>
                  <div className="font-semibold text-slate-800">1단계: 작은 순서대로 정렬하기</div>
                  <div className="font-mono text-xs bg-white p-2 rounded border border-slate-200 mt-1 break-all text-slate-700">
                    [{stats.sortedData.join(', ')}]
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-slate-800">
                    2단계: 자료의 개수 확인 ({stats.count}개 👉 {stats.isEven ? '짝수 개' : '홀수 개'})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stats.isEven
                      ? `자료가 짝수 개이므로 가운데 2개(${stats.sortedData[stats.medianIndices[0]]}점, ${stats.sortedData[stats.medianIndices[1]]}점)의 평균을 구해요.`
                      : `자료가 홀수 개이므로 정확히 한가운데 위치한 ${Math.floor(stats.count / 2) + 1}번째 값을 선택해요.`}
                  </div>
                </div>

                {/* Highlighted sorted boxes */}
                <div className="pt-2">
                  <div className="font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>중앙 위치 하이라이트</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      중앙값: {stats.medianFormatted}점
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white border border-slate-200 rounded-lg p-2.5 min-h-[70px]">
                    {stats.sortedData.map((val, idx) => {
                      const isTarget = stats.medianIndices.includes(idx);
                      return (
                        <div
                          key={idx}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                            isTarget
                              ? 'bg-emerald-600 text-white scale-110 shadow-sm ring-2 ring-emerald-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {val}
                          {isTarget && (
                            <span className="block text-[9px] font-normal text-emerald-100 text-center">
                              중앙
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {stats.isEven && (
                  <div className="bg-white p-2 rounded border border-emerald-200 text-center text-xs font-mono text-emerald-800">
                    ({stats.sortedData[stats.medianIndices[0]]} + {stats.sortedData[stats.medianIndices[1]]}) ÷ 2 ={' '}
                    <strong>{stats.medianFormatted}점</strong>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-emerald-900 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100/70">
              💬 <strong>해설:</strong> 키 순서로 줄을 섰을 때 딱 한가운데 서 있는 사람의 점수는 {stats.medianFormatted}점입니다!
            </div>
          </div>

          {/* 3. MODE VISUALIZER */}
          <div className="border-amber-100 border rounded-xl p-5 bg-gradient-to-b from-amber-50/40 to-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <span>👑</span>
                  <span>최빈값 (Mode) 구하는 과정</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                  {stats.hasNoMode ? '없음' : `${stats.modes.join(', ')}점`}
                </span>
              </div>

              {/* Step By Step Formula */}
              <div className="space-y-3 mt-3 text-xs text-slate-600">
                <div>
                  <div className="font-semibold text-slate-800">1단계: 각 점수별 등장 횟수(빈도) 세기</div>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {Object.entries(stats.frequencies).map(([num, count]) => {
                      const isMode = stats.modes.includes(Number(num));
                      return (
                        <div
                          key={num}
                          className={`p-1.5 rounded border text-xs flex items-center justify-between ${
                            isMode
                              ? 'bg-amber-100 border-amber-300 font-bold text-amber-900'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="font-mono">{num}점</span>
                          <span className="text-[11px]">
                            {count}번 {isMode && '👑'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency Tower Bar */}
                <div className="pt-2">
                  <div className="font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
                    <span>빈도수 비교 탑</span>
                    <span className="text-[11px] text-amber-700 font-semibold">
                      최대 {stats.maxFrequency}회 등장
                    </span>
                  </div>
                  <div className="h-28 bg-white border border-slate-200 rounded-lg p-2 flex items-end justify-around gap-2">
                    {Object.entries(stats.frequencies).map(([num, count]) => {
                      const isMode = stats.modes.includes(Number(num));
                      const maxFreq = Math.max(...Object.values(stats.frequencies), 1);
                      const heightPercent = (count / maxFreq) * 80 + 15;
                      return (
                        <div key={num} className="flex-1 flex flex-col items-center h-full justify-end">
                          <span
                            className={`text-[10px] font-mono font-bold mb-0.5 ${
                              isMode ? 'text-amber-800' : 'text-slate-500'
                            }`}
                          >
                            {count}회
                          </span>
                          <div
                            className={`w-full rounded-t transition-all duration-300 ${
                              isMode ? 'bg-amber-500' : 'bg-slate-300'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-[10px] font-mono font-semibold text-slate-700 mt-1 truncate">
                            {num}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-100/70">
              💬 <strong>해설:</strong>{' '}
              {stats.hasNoMode
                ? '모든 점수가 각각 1번씩만 나왔으므로 최빈값은 없습니다.'
                : `가장 많은 인원(${stats.maxFrequency}명)이 받은 점수는 바로 [${stats.modes.join(', ')}점]입니다!`}
            </div>
          </div>
        </div>

        {/* 03. OUTLIER EXPERIMENT SLIDER: Why Median is resistant to outliers! */}
        <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                직접 체험: "극단값(Outlier) 슬라이더 실험실"
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsSliderActive(!isSliderActive);
                  if (!isSliderActive) setOutlierSliderValue(currentData[currentData.length - 1]);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  isSliderActive
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {isSliderActive ? '실험 모드 켜짐 (끄기)' : '🔬 슬라이더로 실험 시작하기'}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            마지막 학생 1명의 점수를 <strong>100점</strong>에서 <strong>500점</strong>(엄청난 극단값)으로 끌어올려 보세요!
            평균과 중앙값 중 어느 대푯값이 어떻게 반응하는지 두 눈으로 확인해 봅시다.
          </p>

          {isSliderActive && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">마지막 학생 점수:</span>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="5"
                  value={outlierSliderValue}
                  onChange={(e) => setOutlierSliderValue(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
                <span className="font-mono text-lg font-extrabold text-amber-400 min-w-[70px] text-right">
                  {outlierSliderValue}점
                </span>
              </div>

              {/* Dynamic Comparison Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                    <span>⚖️ 평균 (Mean)의 변화</span>
                    <span className="text-[10px] text-red-400 font-semibold">극단값에 크게 요동침!</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-indigo-400">
                    {stats.meanFormatted}점
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    한 명이 {outlierSliderValue}점을 받자 평균 점수가 엄청나게 끌려올라갔어요.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-emerald-500/30 p-3.5 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
                    <span>🎯 중앙값 (Median)의 변화</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">끄떡없이 안정적!</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {stats.medianFormatted}점
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    마지막 한 사람의 점수가 500점이든 1000점이든 한가운데 서 있는 중앙값은 든든하게 유지돼요!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Summary Reference Cheat Sheet */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span>📝</span>
          <span>중학교 1학년 시험 대비 핵심 요약 노트</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-indigo-700">1. 평균 (Mean)</span>
            <p className="text-slate-600">
              총합을 개수로 나눈 값. 모든 자료의 값을 빠짐없이 활용하지만, 극단적인 값에 매우 약해요.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-emerald-700">2. 중앙값 (Median)</span>
            <p className="text-slate-600">
              작은 순서로 정렬했을 때 한가운데 값. 짝수 개일 땐 가운데 두 값의 평균! 극단값이 있을 때 가장 적절해요.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-amber-700">3. 최빈값 (Mode)</span>
            <p className="text-slate-600">
              가장 많이 나온 값. 최빈값은 1개, 2개 이상이거나 없을 수도 있어요. 신발 크기나 혈액형 조사에 유용해요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
