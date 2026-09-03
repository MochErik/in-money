export interface ICategoryBudget {
  id: string;
  categoryId: string;
  categoryName: string;
  monthlyLimit: number;
  currentSpent: number;
  period: string; // YYYY-MM
}

export interface IBudgetHealthScore {
  percentageUsed: number;
  score: number;
  rating: 'SAFE' | 'MODERATE' | 'CRITICAL';
  remainingBudget: number;
  daysRemainingInMonth: number;
}
