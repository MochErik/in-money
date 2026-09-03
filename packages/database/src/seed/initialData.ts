import { db } from '../db';
import { DEFAULT_WALLETS } from '@zenith/core';

export async function seedInitialDatabaseIfEmpty(): Promise<void> {
  const walletCount = await db.wallets.count();
  if (walletCount === 0) {
    await db.wallets.bulkAdd(DEFAULT_WALLETS);
    
    // Add default initial savings
    await db.savingsGoals.bulkAdd([
      {
        id: 'sav-1',
        targetName: 'Tabungan Utama',
        currentAmount: 25000000,
        goalAmount: 50000000,
        isFlexible: false,
        notes: 'Tabungan fleksibel',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 'sav-2',
        targetName: 'Celengan Pribadi',
        currentAmount: 14500000,
        goalAmount: 0,
        isFlexible: true,
        notes: 'Tanpa batas target',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ]);
  }
}
