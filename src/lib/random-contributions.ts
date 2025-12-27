import type { ContributionResponse } from '@/app/(page)/contributions';

export function randomYearOfContributions(): ContributionResponse['contributions'] {
  // ========== KNOBS ==========

  // Overall activity
  const activeDaysFraction = 0.7; // What fraction of days have activity (0-1)
  const clusterChance = 0.1; // Chance to start a cluster when iterating
  const baseWeight = 0.35; // Weight for days outside clusters
  const weekendMultiplier = 0.8; // Weekend weight multiplier (0 = no weekends, 1 = same as weekdays)

  // Cluster sizes: [min, max] for each tier
  const clusterSizes = {
    small: { range: [2, 5] as const, probability: 0.5 }, // 50% chance
    medium: { range: [6, 10] as const, probability: 0.35 }, // 35% chance
    large: { range: [11, 18] as const, probability: 0.15 }, // 15% chance
  };

  // Gap between clusters: [min, max] for short and long gaps
  const clusterGaps = {
    short: { range: [1, 3] as const, probability: 0.3 },
    long: { range: [4, 10] as const, probability: 0.7 },
  };

  // Cluster intensity range (how much weight clusters add)
  const clusterIntensity = { min: 0.4, max: 1.0 };

  // Level distribution ratios
  const levelRatios = {
    1: 2.7, // indigo-300/900 - most common
    2: 1.7, // indigo-400
    3: 0.5, // indigo-200 (white)
    4: 0.2, // rose-600 (red)
  };

  // Minimum spacing between level 4s (reds)
  const minLevel4Spacing = 5;

  // Noise range for day weights (adds randomness)
  const noiseRange = { min: 0.7, max: 1.3 };

  // ========== END KNOBS ==========

  const today = new Date();

  // PHASE 1: Generate placement weights for each day
  // Using cluster and weekend logic

  // Generate clusters with configurable sizes
  const activePeriods: { start: number; end: number; intensity: number }[] = [];
  let day = 0;
  while (day < 365) {
    if (Math.random() < clusterChance) {
      // Pick cluster size based on probabilities
      const sizeRoll = Math.random();
      let duration: number;
      if (sizeRoll < clusterSizes.small.probability) {
        const [min, max] = clusterSizes.small.range;
        duration = min + Math.floor(Math.random() * (max - min + 1));
      } else if (
        sizeRoll <
        clusterSizes.small.probability + clusterSizes.medium.probability
      ) {
        const [min, max] = clusterSizes.medium.range;
        duration = min + Math.floor(Math.random() * (max - min + 1));
      } else {
        const [min, max] = clusterSizes.large.range;
        duration = min + Math.floor(Math.random() * (max - min + 1));
      }

      const intensity =
        clusterIntensity.min +
        Math.random() * (clusterIntensity.max - clusterIntensity.min);
      activePeriods.push({ start: day, end: day + duration, intensity });

      // Gap after cluster
      const gapRoll = Math.random();
      let gap: number;
      if (gapRoll < clusterGaps.short.probability) {
        const [min, max] = clusterGaps.short.range;
        gap = min + Math.floor(Math.random() * (max - min + 1));
      } else {
        const [min, max] = clusterGaps.long.range;
        gap = min + Math.floor(Math.random() * (max - min + 1));
      }
      day += duration + gap;
    } else {
      day += 1 + Math.floor(Math.random() * 3);
    }
  }

  const getClusterWeight = (dayIndex: number): number => {
    for (const period of activePeriods) {
      if (dayIndex >= period.start && dayIndex <= period.end) {
        return period.intensity;
      }
    }
    return baseWeight;
  };

  // Calculate weight for each day
  const dayWeights: { index: number; weight: number; date: Date }[] = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (364 - i));
    const dayOfWeek = date.getDay();

    const clusterWeight = getClusterWeight(i);
    const weekendWeight =
      dayOfWeek === 0 || dayOfWeek === 6 ? weekendMultiplier : 1.0;

    // Add some randomness to prevent too-perfect patterns
    const noise =
      noiseRange.min + Math.random() * (noiseRange.max - noiseRange.min);

    dayWeights.push({
      index: i,
      weight: clusterWeight * weekendWeight * noise,
      date,
    });
  }

  // PHASE 2: Determine how many of each level to output
  const totalActiveDays = Math.floor(365 * activeDaysFraction);
  const ratioSum =
    levelRatios[1] + levelRatios[2] + levelRatios[3] + levelRatios[4];

  const levelCounts = {
    1: Math.floor((levelRatios[1] / ratioSum) * totalActiveDays),
    2: Math.floor((levelRatios[2] / ratioSum) * totalActiveDays),
    3: Math.floor((levelRatios[3] / ratioSum) * totalActiveDays),
    4: Math.floor((levelRatios[4] / ratioSum) * totalActiveDays),
  };

  // PHASE 3: Assign levels to days based on weight
  // Sort days by weight (highest first) - they get the highest levels
  const sortedByWeight = [...dayWeights].sort((a, b) => b.weight - a.weight);

  // Create a map of day index to assigned level
  const dayLevels = new Map<number, number>();

  // Helper to check if a day is too close to an existing level 4
  const isTooCloseToLevel4 = (dayIndex: number): boolean => {
    for (const [existingIndex, level] of dayLevels.entries()) {
      if (
        level === 4 &&
        Math.abs(existingIndex - dayIndex) < minLevel4Spacing
      ) {
        return true;
      }
    }
    return false;
  };

  // First pass: assign level 4s with spacing constraint
  let level4sAssigned = 0;
  const level4Target = levelCounts[4];
  for (const dayInfo of sortedByWeight) {
    if (level4sAssigned >= level4Target) break;
    if (!isTooCloseToLevel4(dayInfo.index)) {
      dayLevels.set(dayInfo.index, 4);
      level4sAssigned++;
    }
  }

  // Second pass: assign remaining levels (3, 2, 1) to remaining high-weight days
  const remainingPool: number[] = [];
  for (let j = 0; j < levelCounts[3]; j++) remainingPool.push(3);
  for (let j = 0; j < levelCounts[2]; j++) remainingPool.push(2);
  for (let j = 0; j < levelCounts[1]; j++) remainingPool.push(1);

  let poolIndex = 0;
  for (const dayInfo of sortedByWeight) {
    if (poolIndex >= remainingPool.length) break;
    if (!dayLevels.has(dayInfo.index)) {
      dayLevels.set(dayInfo.index, remainingPool[poolIndex]);
      poolIndex++;
    }
  }

  // PHASE 4: Build final contributions array
  const contributions: ContributionResponse['contributions'] = [];

  for (let i = 0; i < 365; i++) {
    const date = dayWeights[i].date;
    const level = dayLevels.get(i) ?? 0;

    // Generate a plausible count based on level
    let count = 0;
    if (level === 1)
      count = 1 + Math.floor(Math.random() * 3); // 1-3
    else if (level === 2)
      count = 4 + Math.floor(Math.random() * 4); // 4-7
    else if (level === 3)
      count = 8 + Math.floor(Math.random() * 8); // 8-15
    else if (level === 4) count = 16 + Math.floor(Math.random() * 5); // 16-20

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }

  return contributions;
}
