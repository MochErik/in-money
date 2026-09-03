import React, { useState, useEffect } from 'react';
import { db, seedInitialDatabaseIfEmpty, TransactionRepository, SavingsRepository, WalletRepository } from '@zenith/database';
import { ITransaction, ISavingsGoal, IWalletAccount, PeriodFilter } from '@zenith/types';
import { formatRupiah, calculateCashflowOverflow } from '@zenith/core';
import { generateCashflowPdf, generateSavingsPdf } from '@zenith/pdf-engine';
import { createJsonBackup, validateBackupJson } from '@zenith/sync-backup';
import { 
  Wallet, Plus, FileDown, Database, ShieldCheck, TrendingUp, 
  Search, Utensils, PiggyBank, ArrowDownToDot, Unlock, X, Eye 
} from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [savings, setSavings] = useState<ISavingsGoal[]>([]);
  const [wallets, setWallets] = useState<IWalletAccount[]>([]);
  const [period, setPeriod] = useState<PeriodFilter>('weekly');
  const [privacyMode, setPrivacyMode] = useState(false);
  
  // Modals state
  const [showAddTx, setShowAddTx] = useState(false);
  const [showAddSavingsTarget, setShowAddSavingsTarget] = useState(false);
  const [showSetorSavings, setShowSetorSavings] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showSavingsPdfModal, setShowSavingsPdfModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);

  // Form State
  const [formType, setFormType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [formAmount, setFormAmount] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formCategory, setFormCategory] = useState('Makanan & Minuman');
  const [formWallet, setFormWallet] = useState('Uang Tunai Cash');
  
  // Savings Form State
  const [targetNameInput, setTargetNameInput] = useState('');
  const [targetGoalInput, setTargetGoalInput] = useState('');
  const [selectedSavingsId, setSelectedSavingsId] = useState('');
  const [savingsSetorAmount, setSavingsSetorAmount] = useState('');
  const [savingsSourceWallet, setSavingsSourceWallet] = useState('Bank Mandiri');

  useEffect(() => {
    async function loadData() {
      await seedInitialDatabaseIfEmpty();
      const txs = await TransactionRepository.getAll();
      const savs = await SavingsRepository.getAllGoals();
      const wals = await WalletRepository.getAll();
      setTransactions(txs);
      setSavings(savs);
      setWallets(wals);
      if (savs.length > 0) setSelectedSavingsId(savs[0].id);
    }
    loadData();
  }, []);

  const overflow = calculateCashflowOverflow(transactions, period);
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);

  const handleAddTx = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formAmount);
    if (!amountNum || !formNote) return;

    const newTx = {
      note: formNote,
      amount: amountNum,
      type: formType,
      categoryId: 'cat-general',
      categoryName: formCategory,
      walletId: 'wallet-default',
      walletName: formWallet,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('id-ID'),
    };

    await TransactionRepository.add(newTx);
    const updated = await TransactionRepository.getAll();
    setTransactions(updated);
    setShowAddTx(false);
    setFormAmount('');
    setFormNote('');
  };

  const handleCreateSavingsTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetNameInput) return;
    await SavingsRepository.addGoal({
      targetName: targetNameInput,
      currentAmount: 0,
      goalAmount: parseFloat(targetGoalInput) || 0,
      isFlexible: !targetGoalInput,
      notes: targetGoalInput ? `Target: Rp ${parseFloat(targetGoalInput).toLocaleString('id-ID')}` : 'Tabungan Fleksibel',
    });
    const updated = await SavingsRepository.getAllGoals();
    setSavings(updated);
    setShowAddSavingsTarget(false);
    setTargetNameInput('');
    setTargetGoalInput('');
  };

  const handleSetorSavings = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(savingsSetorAmount);
    if (!amountNum || !selectedSavingsId) return;

    await SavingsRepository.setorDana(selectedSavingsId, amountNum, 'wallet-id', savingsSourceWallet);
    
    // Also record transaction
    const target = savings.find(s => s.id === selectedSavingsId);
    await TransactionRepository.add({
      note: `Setor Tabungan: ${target?.targetName || 'Tabungan'}`,
      amount: amountNum,
      type: 'EXPENSE',
      categoryId: 'cat-savings',
      categoryName: 'Investasi & Tabungan',
      walletId: 'wallet-id',
      walletName: savingsSourceWallet,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('id-ID'),
    });

    const updatedSav = await SavingsRepository.getAllGoals();
    const updatedTx = await TransactionRepository.getAll();
    setSavings(updatedSav);
    setTransactions(updatedTx);
    setShowSetorSavings(false);
    setSavingsSetorAmount('');
  };

  return (
    <div className="min-h-screen clay-canvas-gradient text-slate-900 font-sans p-3 md:p-6 select-none flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl px-5 py-3.5 flex items-center justify-between sticky top-3 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black text-white font-black text-lg flex items-center justify-center shadow-md">
            $
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 uppercase">Financial Hub</span>
            <span className="text-[10px] text-slate-500 block -mt-0.5 font-medium">Local Offline IndexedDB</span>
          </div>
        </div>

        {/* Period Pills */}
        <div className="flex items-center bg-slate-200/80 p-1 rounded-full text-xs font-semibold gap-1">
          {(['daily', 'weekly', 'monthly', 'yearly'] as PeriodFilter[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1 rounded-full capitalize transition-all ${
                period === p ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p === 'daily' ? 'Harian' : p === 'weekly' ? 'Mingguan' : p === 'monthly' ? 'Bulanan' : 'Tahunan'}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddTx(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catat Transaksi</span>
          </button>
          <button
            onClick={() => setShowPdfModal(true)}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Laporan PDF</span>
          </button>
          <button
            onClick={() => setShowBackupModal(true)}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <Database className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowLockModal(true)}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-emerald-600"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto my-6 space-y-6 flex-1">
        {/* HERO CARD: TOTAL SALDO (MATTE CHARCOAL) */}
        <div className="hero-matte-gradient text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Saldo Bersih Seluruh Dompet</span>
                <button onClick={() => setPrivacyMode(!privacyMode)} className="text-slate-400 hover:text-white">
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {privacyMode ? 'Rp ••••••••••' : formatRupiah(totalBalance || 145780000)}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                  <TrendingUp className="w-3 h-3" /> +14.2%
                </span>
              </div>
            </div>

            {/* Overflow Stats */}
            <div className="flex flex-wrap items-center gap-4 bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div>
                <div className="text-[11px] font-medium text-slate-400 mb-1 uppercase">PEMASUKAN {period}</div>
                <div className="text-lg md:text-xl font-bold text-emerald-400">{formatRupiah(overflow.totalIncome || 12350000)}</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-[11px] font-medium text-slate-400 mb-1 uppercase">PENGELUARAN {period}</div>
                <div className="text-lg md:text-xl font-bold text-rose-400">{formatRupiah(overflow.totalExpense || 6890000)}</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
              <div className="hidden sm:block">
                <div className="text-[11px] font-medium text-slate-400 mb-1">CASHFLOW OVERFLOW</div>
                <div className="text-lg md:text-xl font-bold text-emerald-300">
                  {overflow.surplusDeficit >= 0 ? '+' : '-'}{formatRupiah(Math.abs(overflow.surplusDeficit || 5460000))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABUNGAN & CELENGAN: MONOKROM ABU-ABU TACTILE */}
        <div className="tabungan-ash-card p-6 shadow-md rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Tabungan & Celengan (Menabung)</h3>
                <p className="text-xs text-slate-600">Alokasi simpanan fleksibel sesuai kebutuhan Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddSavingsTarget(true)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Target Baru</span>
              </button>
              <button
                onClick={() => setShowSetorSavings(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <ArrowDownToDot className="w-3.5 h-3.5" />
                <span>Setor Tabungan</span>
              </button>
              <button
                onClick={() => setShowSavingsPdfModal(true)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <FileDown className="w-3.5 h-3.5 text-slate-700" />
                <span>Unduh PDF Tabungan</span>
              </button>
            </div>
          </div>

          {/* Savings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savings.map((s) => {
              const hasGoal = s.goalAmount > 0;
              const pct = hasGoal ? Math.min(100, (s.currentAmount / s.goalAmount) * 100).toFixed(1) : null;
              return (
                <div key={s.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">🪙 {s.targetName}</span>
                    {hasGoal ? (
                      <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">{pct}%</span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">Fleksibel</span>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Terkumpul: <b>{formatRupiah(s.currentAmount)}</b></span>
                      {hasGoal && <span className="text-slate-400">Target: {formatRupiah(s.goalAmount)}</span>}
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-900 h-full rounded-full" style={{ width: `${pct || 100}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DOMPET & REKENING DENGAN LOGO ASLI BERLATAR BELAKANG PUTIH BERSIH */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Dompet & Rekening</h3>
            <span className="text-xs font-bold text-slate-400">6 Akun Aktif</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {wallets.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                    <img src={w.logoUrl} alt={w.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">{w.name}</div>
                </div>
                <div className="font-mono font-bold text-xs text-slate-900">{formatRupiah(w.balance)}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
