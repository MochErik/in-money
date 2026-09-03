import { db } from '../db';
import { IWalletAccount } from '@zenith/types';

export const WalletRepository = {
  async getAll(): Promise<IWalletAccount[]> {
    return db.wallets.toArray();
  },

  async updateBalance(id: string, newBalance: number): Promise<void> {
    await db.wallets.update(id, { balance: newBalance });
  }
};
