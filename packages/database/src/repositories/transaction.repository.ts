import { db } from '../db';
import { ITransaction, PeriodFilter } from '@zenith/types';

export const TransactionRepository = {
  async getAll(): Promise<ITransaction[]> {
    return db.transactions.orderBy('timestamp').reverse().toArray();
  },

  async add(transaction: Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = `tx-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = Date.now();
    const newTx: ITransaction = {
      ...transaction,
      id,
      createdAt: now,
      updatedAt: now,
    };
    await db.transactions.add(newTx);
    return id;
  },

  async delete(id: string): Promise<void> {
    await db.transactions.delete(id);
  },

  async getByPeriod(startTime: number, endTime: number): Promise<ITransaction[]> {
    return db.transactions
      .where('timestamp')
      .between(startTime, endTime, true, true)
      .reverse()
      .toArray();
  }
};
