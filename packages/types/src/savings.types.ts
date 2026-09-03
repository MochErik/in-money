export interface ISavingsGoal {
  id: string;
  targetName: string;
  currentAmount: number;
  goalAmount: number;
  isFlexible: boolean;
  notes?: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ISavingsMutation {
  id: string;
  savingsGoalId: string;
  savingsGoalName: string;
  type: 'SETOR' | 'TARIK';
  amount: number;
  sourceWalletId: string;
  sourceWalletName: string;
  timestamp: number;
  notes?: string;
}
