import { db } from '../db';
import { ISavingsGoal, ISavingsMutation } from '@zenith/types';

export const SavingsRepository = {
  async getAllGoals(): Promise<ISavingsGoal[]> {
    return db.savingsGoals.toArray();
  },

  async addGoal(goal: Omit<ISavingsGoal, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = `sav-${Date.now()}`;
    const now = Date.now();
    await db.savingsGoals.add({
      ...goal,
      id,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },

  async setorDana(goalId: string, amount: number, walletId: string, walletName: string): Promise<void> {
    const goal = await db.savingsGoals.get(goalId);
    if (!goal) throw new Error('Goal not found');

    const newAmount = goal.currentAmount + amount;
    await db.savingsGoals.update(goalId, { currentAmount: newAmount, updatedAt: Date.now() });

    // Record mutation
    await db.savingsMutations.add({
      id: `mut-${Date.now()}`,
      savingsGoalId: goalId,
      savingsGoalName: goal.targetName,
      type: 'SETOR',
      amount,
      sourceWalletId: walletId,
      sourceWalletName: walletName,
      timestamp: Date.now(),
    });
  },

  async getAllMutations(): Promise<ISavingsMutation[]> {
    return db.savingsMutations.orderBy('timestamp').reverse().toArray();
  }
};
