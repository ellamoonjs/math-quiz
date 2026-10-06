export interface StatisticsResult {
  sortedData: number[];
  mean: number;
  meanFormatted: string;
  sum: number;
  count: number;
  median: number;
  medianFormatted: string;
  medianIndices: number[]; // indices in sortedData that form the median (1 if odd, 2 if even)
  isEven: boolean;
  modes: number[];
  frequencies: Record<number, number>;
  maxFrequency: number;
  hasNoMode: boolean; // if all values have frequency 1
}

export function calculateStatistics(data: number[]): StatisticsResult {
  if (data.length === 0) {
    return {
      sortedData: [],
      mean: 0,
      meanFormatted: '0',
      sum: 0,
      count: 0,
      median: 0,
      medianFormatted: '0',
      medianIndices: [],
      isEven: false,
      modes: [],
      frequencies: {},
      maxFrequency: 0,
      hasNoMode: true,
    };
  }

  const sortedData = [...data].sort((a, b) => a - b);
  const count = sortedData.length;
  const sum = sortedData.reduce((acc, curr) => acc + curr, 0);
  const rawMean = sum / count;
  const mean = Math.round(rawMean * 10) / 10;
  const meanFormatted = Number.isInteger(mean) ? mean.toString() : mean.toFixed(1);

  // Median
  const isEven = count % 2 === 0;
  let median = 0;
  let medianIndices: number[] = [];

  if (isEven) {
    const mid1 = count / 2 - 1;
    const mid2 = count / 2;
    medianIndices = [mid1, mid2];
    const rawMedian = (sortedData[mid1] + sortedData[mid2]) / 2;
    median = Math.round(rawMedian * 10) / 10;
  } else {
    const mid = Math.floor(count / 2);
    medianIndices = [mid];
    median = sortedData[mid];
  }
  const medianFormatted = Number.isInteger(median) ? median.toString() : median.toFixed(1);

  // Mode
  const frequencies: Record<number, number> = {};
  for (const num of sortedData) {
    frequencies[num] = (frequencies[num] || 0) + 1;
  }

  let maxFrequency = 0;
  for (const num in frequencies) {
    if (frequencies[num] > maxFrequency) {
      maxFrequency = frequencies[num];
    }
  }

  const modes: number[] = [];
  // If maxFrequency is 1 and all distinct, in middle school curriculum we say "최빈값이 없다"
  const distinctCount = Object.keys(frequencies).length;
  const hasNoMode = maxFrequency === 1 && count > 1;

  if (!hasNoMode) {
    for (const numStr in frequencies) {
      if (frequencies[numStr] === maxFrequency) {
        modes.push(Number(numStr));
      }
    }
    modes.sort((a, b) => a - b);
  }

  return {
    sortedData,
    mean,
    meanFormatted,
    sum,
    count,
    median,
    medianFormatted,
    medianIndices,
    isEven,
    modes,
    frequencies,
    maxFrequency,
    hasNoMode,
  };
}
