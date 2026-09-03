export type WalletType = 'CASH' | 'BANK' | 'E_WALLET';

export interface IWalletAccount {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  accountNumber?: string;
  logoUrl?: string;
  isDefault: boolean;
  colorScheme: string;
}
