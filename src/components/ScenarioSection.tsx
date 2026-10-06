import React, { useState } from 'react';
import { SCENARIOS } from '../data/mockData';
import { MeasureType, Scenario } from '../types';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  Building2,
  ShoppingBag,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const ScenarioSection: React.FC = () => {
  const [selectedChoices, setSelectedChoices] = useState<Record<string, MeasureType>>({});
  const [showOutlierDemo, setShowOutlierDemo] = useState<boolean>(true);

  const handleSelectChoice = (scenarioId: string, measure: MeasureType) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [scenarioId]: measure,
    }));
  };

  const scenarioIcons: Record<string, React.ReactNode> = {
    'scenario-a': <Building2 className="w-5 h-5 text-indigo-600" />,
    'scenario-b': <ShoppingBag className="w-5 h-5 text-amber-600" />,
    'scenario-c': <GraduationCap className="w-5 h-5 text-emerald-600" />,
  };

  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-violet-200 text-xs sm:text-sm font-medium">
            <Compass className="w-4 h-4" />
            <span>실생활 통계 탐구</span>
            <span aria-hidden="true">·</span>
            <span>대푯값의 올바른 선택</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            상황에 딱 맞는 대푯값은 무엇일까요?
          </h1>
          <p className="text-violet-100 text-sm sm:text-base leading-relaxed">
            통계에서는 단순히 계산만 잘하는 것보다, <strong className="text-white">"이 상황에서는 어떤 대푯값을 써야 자료의 현실을 왜곡하지 않을까?"</strong>를 판단하는 통찰력이 훨씬 중요합니다. 아래 3가지 실생활 상황을 읽고 가장 합리적인 대푯값을 선택해 보세요!
          </p>
        </div>
      </section>

      {/* 3 Scenarios List */}
      <div className="space-y-8">
        {SCENARIOS.map((scenario, index) => {
          const userChoice = selectedChoices[scenario.id];
          const isCorrect = userChoice === scenario.correctMeasure;
          const hasSelected = !!userChoice;

          return (
            <div
              key={scenario.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    {scenarioIcons[scenario.id]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-700">
                      실생활 탐구 Case #{index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {scenario.title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                  {scenario.badge}
                </span>
              </div>

              {/* Story Narrative Box */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {scenario.story}
                </p>
                <div className="text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 font-mono">
                  📊 {scenario.dataSummary}
                </div>
              </div>

              {/* Special Interactive Simulation for Scenario A (Chairman Salary) */}
              {scenario.id === 'scenario-a' && (
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>비교 실험: 회장님 연봉 50억 원을 뺐을 때 vs 넣었을 때</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowOutlierDemo(!showOutlierDemo)}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
                    >
                      {showOutlierDemo ? '비교 숨기기' : '비교 표 보기'}
                    </button>
                  </div>

                  {showOutlierDemo && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-700">
                          1) 일반 직원 9명만 계산할 때
                        </div>
                        <div className="text-slate-600">
                          · 평균: <strong className="text-indigo-700 font-mono">3,555만 원</strong>
                        </div>
                        <div className="text-slate-600">
                          · 중앙값: <strong className="text-emerald-700 font-mono">3,500만 원</strong>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          👉 두 대푯값이 서로 비슷하고 실제 체감과 일치해요!
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-lg border border-amber-300 space-y-1">
                        <div className="font-bold text-amber-900 flex items-center justify-between">
                          <span>2) 회장님(50억) 포함 시 (10명)</span>
                          <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-normal">
                            극단값 투입!
                          </span>
                        </div>
                        <div className="text-slate-600">
                          · 평균: <strong className="text-red-600 font-mono text-sm">약 5억 3,200만 원 (15배 폭등!)</strong>
                        </div>
                        <div className="text-slate-600">
                          · 중앙값: <strong className="text-emerald-700 font-mono">3,550만 원 (거의 그대로!)</strong>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          👉 평균은 왜곡되었지만 중앙값은 진실을 지켜냅니다!
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Special Interactive Visual for Scenario B (Shoe Store) */}
              {scenario.id === 'scenario-b' && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
                  <span className="font-bold text-amber-900 block">
                    👟 지난달 신발 판매 현황 그래프
                  </span>
                  <div className="grid grid-cols-5 gap-2 text-center pt-1">
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <div className="font-mono text-slate-500">240mm</div>
                      <div className="font-bold text-slate-700">2켤레</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <div className="font-mono text-slate-500">250mm</div>
                      <div className="font-bold text-slate-700">5켤레</div>
                    </div>
                    <div className="bg-amber-100 p-2 rounded border-2 border-amber-400">
                      <div className="font-mono font-bold text-amber-900">260mm 👑</div>
                      <div className="font-bold text-amber-800 text-sm">50켤레 (압도적!)</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <div className="font-mono text-slate-500">270mm</div>
                      <div className="font-bold text-slate-700">6켤레</div>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <div className="font-mono text-slate-500">280mm</div>
                      <div className="font-bold text-slate-700">2켤레</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 pt-1">
                    수학적으로 평균을 내면 약 <strong>259.7mm</strong>가 나옵니다. 하지만 신발 공장에 "259.7mm 사이즈 신발 만들어주세요!"라고 할 수 있을까요?
                  </p>
                </div>
              )}

              {/* Selection Prompt */}
              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>질문: {scenario.questionText}</span>
                </div>

                {/* 3 Choice Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scenario.options.map((opt) => {
                    const isSelected = userChoice === opt.type;
                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';

                    if (isSelected) {
                      if (opt.type === scenario.correctMeasure) {
                        btnStyle = 'bg-emerald-600 border-emerald-600 text-white shadow-xs';
                      } else {
                        btnStyle = 'bg-red-500 border-red-500 text-white shadow-xs';
                      }
                    }

                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => handleSelectChoice(scenario.id, opt.type)}
                        className={`p-3.5 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${btnStyle}`}
                      >
                        {isSelected && opt.type === scenario.correctMeasure && (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        )}
                        {isSelected && opt.type !== scenario.correctMeasure && (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Deep Explanation (Revealed when clicked) */}
              {hasSelected && (
                <div
                  className={`rounded-xl p-5 border transition-all space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/90 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold flex items-center gap-1.5">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>정답입니다! 정확한 통계적 판단이에요! 🎉</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          <span>잠깐! 이 상황에서는 다른 대푯값이 더 어울려요. 💡</span>
                        </>
                      )}
                    </span>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-white/80 border border-current">
                      추천 대푯값:{' '}
                      {scenario.correctMeasure === 'median' && '중앙값 (Median)'}
                      {scenario.correctMeasure === 'mode' && '최빈값 (Mode)'}
                      {scenario.correctMeasure === 'mean' && '평균 (Mean)'}
                    </span>
                  </div>

                  <div className="bg-white/90 rounded-lg p-4 text-xs space-y-2 border border-slate-200/60 leading-relaxed text-slate-800">
                    <div>
                      <strong className="text-slate-900 block mb-1">
                        🎯 왜 이 대푯값이 가장 적절할까요?
                      </strong>
                      <p>{scenario.explanation.whyCorrect}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <strong className="text-slate-700 block mb-1">
                        ⚠️ 다른 대푯값들이 왜 아쉬운가요?
                      </strong>
                      <p className="text-slate-600">{scenario.explanation.whyOthersFail}</p>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-800 bg-white/60 p-2.5 rounded-lg border border-slate-200/50">
                    {scenario.explanation.keyTakeaway}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Summary: 3 Golden Rules */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            통계 마스터의 생각법
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            어떤 대푯값을 골라야 할까? 황금률 3원칙
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/90 border border-emerald-500/30 p-4 rounded-xl space-y-2">
            <div className="text-2xl">🎯</div>
            <div className="font-bold text-sm text-emerald-400">
              1. 극단값(아웃라이어)이 있을 때 👉 중앙값!
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              너무 크거나 너무 작은 튀는 값이 있으면 평균이 심하게 왜곡됩니다. 순서대로 줄을 세워 가운데를 찾는 중앙값이 가장 정직합니다.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-amber-500/30 p-4 rounded-xl space-y-2">
            <div className="text-2xl">👑</div>
            <div className="font-bold text-sm text-amber-400">
              2. 규격 상품, 인기 투표, 문자 자료 👉 최빈값!
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              신발/옷 치수, 혈액형, 좋아하는 음식처럼 가장 인기 있는 규격이나 숫자가 아닌 명목 자료를 다룰 때는 최빈값이 유일한 해결책입니다.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-indigo-500/30 p-4 rounded-xl space-y-2">
            <div className="text-2xl">⚖️</div>
            <div className="font-bold text-sm text-indigo-400">
              3. 모든 자료를 골고루 반영할 때 👉 평균!
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              튀는 값 없이 골고루 분포된 시험 성적, 키, 몸무게 등에서 모든 사람의 수치를 하나도 빠짐없이 반영하고 싶을 때는 평균이 최고입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
