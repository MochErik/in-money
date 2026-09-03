import { ITransaction } from './transaction.types';
import { ISavingsMutation } from './savings.types';

export interface IPdfReportRequest {
  title: string;
  periodType: 'weekly' | 'monthly' | 'yearly' | 'custom';
  startDate: string;
  endDate: string;
  transactions: ITransaction[];
  savingsMutations?: ISavingsMutation[];
  generatedAt: string;
}
