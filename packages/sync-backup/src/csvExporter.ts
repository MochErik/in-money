import { ITransaction } from '@zenith/types';

export function exportTransactionsToCsv(transactions: ITransaction[]): string {
  const headers = ['ID', 'Waktu', 'Keterangan', 'Kategori', 'Dompet', 'Tipe', 'Nominal'];
  const rows = transactions.map((t) => [
    t.id,
    new Date(t.timestamp).toISOString(),
    `"${t.note.replace(/"/g, '""')}"`,
    `"${t.categoryName}"`,
    `"${t.walletName}"`,
    t.type,
    t.amount,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
