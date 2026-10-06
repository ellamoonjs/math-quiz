export type TabType = 'concept' | 'quiz' | 'scenario';

export type MeasureType = 'mean' | 'median' | 'mode';

export interface QuizQuestion {
  id: number;
  title: string;
  question: string;
  data: number[];
  unit: string;
  targetMeasure: MeasureType;
  correctAnswer: number | string;
  explanation: {
    steps: string[];
    summary: string;
  };
}

export interface Scenario {
  id: 'scenario-a' | 'scenario-b' | 'scenario-c';
  title: string;
  badge: string;
  story: string;
  dataSummary: string;
  questionText: string;
  correctMeasure: MeasureType;
  options: {
    type: MeasureType;
    label: string;
  }[];
  explanation: {
    whyCorrect: string;
    whyOthersFail: string;
    keyTakeaway: string;
  };
  simulationData?: {
    withOutlier: number[];
    withoutOutlier: number[];
    outlierLabel: string;
  };
}
