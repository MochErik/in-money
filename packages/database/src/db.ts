import Dexie, { type Table } from 'dexie';
import { ITransaction, ISavingsGoal, ISavingsMutation, IWalletAccount, ICategoryBudget, IUserProfile } from '@zenith/types';

export class ZenithDatabase extends Dexie {
  transactions!: Table<ITransaction, string>;
  savingsGoals!: Table<ISavingsGoal, string>;
  savingsMutations!: Table<ISavingsMutation, string>;
  wallets!: Table<IWalletAccount, string>;
  budgets!: Table<ICategoryBudget, string>;
  userProfile!: Table<IUserProfile, string>;

  constructor() {
    super('ZenithFinancialFlowDB');
    this.version(1).stores({
      transactions: 'id, timestamp, type, categoryId, walletId, createdAt',
      savingsGoals: 'id, targetName, currentAmount, isFlexible, createdAt',
      savingsMutations: 'id, savingsGoalId, timestamp, type, sourceWalletId',
      wallets: 'id, name, type, balance',
      budgets: 'id, categoryId, period',
      userProfile: 'id, username',
    });
  }
}

export const db = new ZenithDatabase();
