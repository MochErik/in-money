export interface ICategoryItem {
  id: string;
  name: string;
  icon: string;
  type: 'EXPENSE' | 'INCOME';
}

export const DEFAULT_CATEGORIES: ICategoryItem[] = [
  { id: 'cat-food', name: 'Makanan & Minuman', icon: 'utensils', type: 'EXPENSE' },
  { id: 'cat-trans', name: 'Transportasi', icon: 'car', type: 'EXPENSE' },
  { id: 'cat-bills', name: 'Tagihan & Utilitas', icon: 'zap', type: 'EXPENSE' },
  { id: 'cat-groceries', name: 'Belanja Harian', icon: 'shopping-cart', type: 'EXPENSE' },
  { id: 'cat-savings', name: 'Investasi & Tabungan', icon: 'trending-up', type: 'EXPENSE' },
  { id: 'cat-salary', name: 'Gaji & Karir', icon: 'briefcase', type: 'INCOME' },
  { id: 'cat-freelance', name: 'Side Project / Freelance', icon: 'code', type: 'INCOME' },
  { id: 'cat-passive', name: 'Bunga & Dividen', icon: 'coins', type: 'INCOME' },
];
