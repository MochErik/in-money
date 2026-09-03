import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { ISavingsGoal } from '@zenith/types';
import { formatRupiah, formatIndonesianDate } from '@zenith/core';

export function generateSavingsPdf(
  savings: ISavingsGoal[],
  periodTitle = 'Laporan Keseluruhan'
): jsPDF {
  const doc = new jsPDF();

  doc.setFillColor(18, 18, 21);
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('LAPORAN MUTASI TABUNGAN & CELENGAN', 14, 18);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Zenith Savings Engine • Periode: ${periodTitle} • Cetak: ${formatIndonesianDate(new Date())}`, 14, 26);

  let totalSav = 0;
  const tableData = savings.map((s, idx) => {
    totalSav += s.currentAmount;
    const hasGoal = s.goalAmount > 0;
    const pct = hasGoal ? `${((s.currentAmount / s.goalAmount) * 100).toFixed(1)}%` : 'Fleksibel';
    return [
      idx + 1,
      s.targetName,
      formatRupiah(s.currentAmount),
      hasGoal ? formatRupiah(s.goalAmount) : 'Fleksibel',
      pct,
      s.notes || 'Tabungan Aktif',
    ];
  });

  (doc as any).autoTable({
    startY: 45,
    head: [['No', 'Nama Tabungan', 'Saldo Terkumpul', 'Target', 'Progress', 'Keterangan']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [18, 18, 21], fontStyle: 'bold' },
    styles: { fontSize: 8, font: 'helvetica' },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setTextColor(24, 24, 27);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Keseluruhan Saldo Tabungan: ${formatRupiah(totalSav)}`, 14, finalY);

  return doc;
}
