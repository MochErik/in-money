import { IBudgetHealthScore } from '@zenith/types';

export function calculateBudgetHealthScore(
  totalBudget: number,
  totalSpent: number,
  daysRemainingInMonth: number = 18
): IBudgetHealthScore {
  if (totalBudget <= 0) {
    return {
      percentageUsed: 0,
      score: 100,
      rating: 'SAFE',
      remainingBudget: 0,
      daysRemainingInMonth,
    };
  }

  const percentageUsed = Math.min(100, (totalSpent / totalBudget) * 100);
  const remainingBudget = Math.max(0, totalBudget - totalSpent);

  let rating: 'SAFE' | 'MODERATE' | 'CRITICAL' = 'SAFE';
  let score = 100 - percentageUsed;

  if (percentageUsed >= 90) {
    rating = 'CRITICAL';
  } else if (percentageUsed >= 75) {
    rating = 'MODERATE';
  } else {
    rating = 'SAFE';
  }

  return {
    percentageUsed: Number(percentageUsed.toFixed(1)),
    score: Math.max(0, Number(score.toFixed(0))),
    rating,
    remainingBudget,
    daysRemainingInMonth,
  };
}
