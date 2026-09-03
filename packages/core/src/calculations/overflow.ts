import { ITransaction, ICashflowOverflowSummary, PeriodFilter } from '@zenith/types';

export function calculateCashflowOverflow(
  transactions: ITransaction[],
  period: PeriodFilter = 'weekly'
): ICashflowOverflowSummary {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type === 'INCOME') {
      totalIncome += tx.amount;
    } else if (tx.type === 'EXPENSE') {
      totalExpense += tx.amount;
    }
  }

  const surplusDeficit = totalIncome - totalExpense;
  const overflowRatio = totalIncome > 0 ? (surplusDeficit / totalIncome) * 100 : totalExpense > 0 ? -100 : 0;

  let status: 'SURPLUS_SAFE' | 'DEFICIT_WARNING' | 'BALANCED' = 'BALANCED';
  if (surplusDeficit > 0) {
    status = 'SURPLUS_SAFE';
  } else if (surplusDeficit < 0) {
    status = 'DEFICIT_WARNING';
  }

  return {
    period,
    totalIncome,
    totalExpense,
    surplusDeficit,
    overflowRatio: Number(overflowRatio.toFixed(1)),
    transactionCount: transactions.length,
    status,
  };
}
