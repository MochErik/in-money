import { ITransaction, ISavingsGoal, IWalletAccount } from '@zenith/types';

export interface IBackupPayload {
  app: 'Zenith Financial Flow';
  version: '2.0.0';
  exportedAt: string;
  transactions: ITransaction[];
  savings: ISavingsGoal[];
  wallets: IWalletAccount[];
}

export function createJsonBackup(
  transactions: ITransaction[],
  savings: ISavingsGoal[],
  wallets: IWalletAccount[]
): string {
  const payload: IBackupPayload = {
    app: 'Zenith Financial Flow',
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    transactions,
    savings,
    wallets,
  };
  return JSON.stringify(payload, null, 2);
}
