import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ITransaction } from '@zenith/types';
import { formatRupiah, formatIndonesianDate } from '@zenith/core';

export function generateCashflowPdf(
  transactions: ITransaction[],
  periodTitle = 'Mingguan'
): jsPDF {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(18, 18, 21);
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('LAPORAN ARUS KAS & KEUANGAN', 14, 18);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Zenith Financial Flow • Periode: ${periodTitle} • Cetak: ${formatIndonesianDate(new Date())}`, 14, 26);

  let totalInc = 0;
  let totalExp = 0;
  transactions.forEach((t) => {
    if (t.type === 'INCOME') totalInc += t.amount;
    else totalExp += t.amount;
  });

  const tableData = transactions.map((t, idx) => [
    idx + 1,
    t.dateStr || formatIndonesianDate(t.timestamp),
    t.note,
    t.categoryName,
    t.walletName,
    t.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran',
    `${t.type === 'INCOME' ? '+ ' : '- '} ${formatRupiah(t.amount)}`,
  ]);

  (doc as any).autoTable({
    startY: 45,
    head: [['No', 'Tanggal', 'Keterangan', 'Kategori', 'Dompet/Bank', 'Tipe', 'Nominal']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [18, 18, 21], fontStyle: 'bold' },
    styles: { fontSize: 8, font: 'helvetica' },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setTextColor(24, 24, 27);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Pemasukan: ${formatRupiah(totalInc)}`, 14, finalY);
  doc.text(`Total Pengeluaran: ${formatRupiah(totalExp)}`, 14, finalY + 6);
  doc.text(`Surplus/Defisit Bersih: ${formatRupiah(totalInc - totalExp)}`, 14, finalY + 12);

  return doc;
}
