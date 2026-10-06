import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, HelpCircle } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [submittedStates, setSubmittedStates] = useState<Record<number, { isSubmitted: boolean; isCorrect: boolean }>>({});
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleInputChange = (questionId: number, val: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [questionId]: val,
    }));
  };

  const handleCheckAnswer = (questionId: number) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const inputVal = (userInputs[questionId] || '').trim();
    if (!inputVal) {
      alert('정답을 입력한 후 확인 버튼을 눌러주세요!');
      return;
    }

    const numericInput = parseFloat(inputVal);
    const numericCorrect = typeof question.correctAnswer === 'number' ? question.correctAnswer : parseFloat(question.correctAnswer);

    const isCorrect = Math.abs(numericInput - numericCorrect) < 0.001;

    setSubmittedStates((prev) => ({
      ...prev,
      [questionId]: { isSubmitted: true, isCorrect },
    }));
  };

  const handleRetry = (questionId: number) => {
    setUserInputs((prev) => ({
      ...prev,
      [questionId]: '',
    }));
    setSubmittedStates((prev) => ({
      ...prev,
      [questionId]: { isSubmitted: false, isCorrect: false },
    }));
  };

  const handleResetAll = () => {
    setUserInputs({});
    setSubmittedStates({});
    setCurrentIdx(0);
  };

  const correctCount = Object.values(submittedStates).filter((s) => s.isSubmitted && s.isCorrect).length;
  const answeredCount = Object.values(submittedStates).filter((s) => s.isSubmitted).length;

  return (
    <div className="space-y-8 py-6">
      {/* Header & Score bar */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                실력 쑥쑥! 개념 확인 퀴즈 5선
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              중학교 1학년 시험에 자주 출제되는 핵심 유형 문제들을 직접 풀어보세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Score Tracker */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="text-xs text-slate-500">
                진행 상황: <span className="font-bold text-slate-800">{answeredCount}/5</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <span>정답: {correctCount}개</span>
                {correctCount === 5 && <Award className="w-4 h-4 text-amber-500" />}
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAll}
              title="퀴즈 전체 다시 풀기"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(correctCount / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center justify-between sm:justify-start sm:gap-2 mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2 hidden sm:inline">
            문제 바로가기:
          </span>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const state = submittedStates[q.id];
            let badgeBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            if (state?.isSubmitted) {
              badgeBg = state.isCorrect
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-red-500 text-white font-bold';
            } else if (currentIdx === idx && !showAllQuestions) {
              badgeBg = 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-200';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIdx(idx);
                  setShowAllQuestions(false);
                }}
                className={`w-9 h-9 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${badgeBg}`}
              >
                Q{q.id}
              </button>
            );
          })}

          <div className="ml-auto hidden sm:block">
            <button
              type="button"
              onClick={() => setShowAllQuestions(!showAllQuestions)}
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              {showAllQuestions ? '한 문제씩 보기' : '모든 문제 한 번에 보기'}
            </button>
          </div>
        </div>
      </section>

      {/* Questions Render Area */}
      <div className="space-y-6">
        {(showAllQuestions ? QUIZ_QUESTIONS : [currentQuestion]).map((q) => {
          const state = submittedStates[q.id];
          const inputVal = userInputs[q.id] || '';

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border-2 transition-all p-6 sm:p-7 shadow-xs ${
                state?.isSubmitted
                  ? state.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-200 bg-red-50/10'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {q.targetMeasure === 'mean' && '평균 계산'}
                    {q.targetMeasure === 'median' && '중앙값 찾기'}
                    {q.targetMeasure === 'mode' && '최빈값 찾기'}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                    {q.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{q.id} / 5
                </span>
              </div>

              {/* Question Body */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-4">
                {q.question}
              </p>

              {/* Data Chips */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <span className="text-xs font-bold text-slate-500 block mb-2">
                  주어진 자료 (총 {q.data.length}개):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {q.data.map((val, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-800 shadow-2xs"
                    >
                      {val}
                      <span className="text-xs font-normal text-slate-400 ml-0.5">{q.unit}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Answer Input and Check Form */}
              <div className="space-y-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!state?.isSubmitted) {
                      handleCheckAnswer(q.id);
                    }
                  }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      step="any"
                      disabled={state?.isSubmitted}
                      value={inputVal}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      placeholder="숫자 입력"
                      className={`w-40 sm:w-48 px-4 py-2.5 text-sm font-mono font-bold bg-white border rounded-xl focus:outline-none focus:ring-2 ${
                        state?.isSubmitted
                          ? state.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-red-400 bg-red-50 text-red-900'
                          : 'border-slate-300 focus:ring-indigo-500'
                      }`}
                    />
                    <span className="absolute right-3 text-xs font-medium text-slate-400 pointer-events-none">
                      {q.unit}
                    </span>
                  </div>

                  {!state?.isSubmitted ? (
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
                    >
                      정답 확인하기
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRetry(q.id)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>다시 풀기</span>
                      </button>

                      {!showAllQuestions && currentIdx < QUIZ_QUESTIONS.length - 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentIdx((prev) => prev + 1)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
                        >
                          <span>다음 문제</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </form>

                {/* Feedback Box (Shown after submission) */}
                {state?.isSubmitted && (
                  <div
                    className={`rounded-xl p-4 sm:p-5 border transition-all ${
                      state.isCorrect
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-red-50/90 border-red-200 text-red-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {state.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                      )}

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm sm:text-base font-bold">
                            {state.isCorrect
                              ? '정답입니다! 완벽해요! 🎉'
                              : '아쉬워요! 풀이 과정을 함께 살펴볼까요? 💡'}
                          </h4>
                          <span className="text-xs font-mono font-bold bg-white/80 px-2 py-0.5 rounded border border-current">
                            정답: {q.correctAnswer}
                            {q.unit}
                          </span>
                        </div>

                        {/* Step-by-Step explanation */}
                        <div className="bg-white/80 rounded-lg p-3 text-xs space-y-1.5 border border-slate-200/80">
                          <div className="font-bold text-slate-800">친절한 단계별 풀이:</div>
                          {q.explanation.steps.map((step, sIdx) => (
                            <p key={sIdx} className="text-slate-700 leading-relaxed">
                              {step}
                            </p>
                          ))}
                        </div>

                        <p className="text-xs font-semibold pt-1">
                          {q.explanation.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {answeredCount === 5 && (
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-md text-center space-y-3">
          <div className="inline-flex p-3 bg-white/20 rounded-full mb-1">
            <Award className="w-8 h-8 text-amber-300" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            축하합니다! 5문제를 모두 완료했습니다!
          </h3>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto">
            총 5문제 중 <strong className="text-white text-base">{correctCount}문제</strong>를 맞혔어요.{' '}
            {correctCount === 5
              ? '당신은 이미 중1 통계 대푯값 마스터입니다! 🏆'
              : '틀린 문제의 풀이 과정을 꼼꼼히 확인하고 다시 도전해 보세요! 👍'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-white text-emerald-800 rounded-xl hover:bg-emerald-50 transition-colors shadow-xs"
            >
              처음부터 다시 도전하기
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
