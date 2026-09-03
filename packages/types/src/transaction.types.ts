export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export interface ITransaction {
  id: string;
  note: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  categoryName: string;
  walletId: string;
  walletName: string;
  timestamp: number;
  dateStr: string;
  tags?: string[];
  receiptBase64?: string;
  createdAt: number;
  updatedAt: number;
}

export type PeriodFilter = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface ICashflowOverflowSummary {
  period: PeriodFilter;
  totalIncome: number;
  totalExpense: number;
  surplusDeficit: number;
  overflowRatio: number;
  transactionCount: number;
  status: 'SURPLUS_SAFE' | 'DEFICIT_WARNING' | 'BALANCED';
}
