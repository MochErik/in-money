import { z } from 'zod';

export const BackupSchema = z.object({
  app: z.string(),
  version: z.string(),
  exportedAt: z.string(),
  transactions: z.array(z.object({
    id: z.string(),
    note: z.string(),
    amount: z.number(),
    type: z.enum(['EXPENSE', 'INCOME', 'TRANSFER']),
    categoryName: z.string(),
    walletName: z.string(),
    timestamp: z.number(),
  })),
  savings: z.array(z.object({
    id: z.string(),
    targetName: z.string(),
    currentAmount: z.number(),
  })).optional(),
});

export function validateBackupJson(jsonString: string) {
  try {
    const parsed = JSON.parse(jsonString);
    return BackupSchema.safeParse(parsed);
  } catch (err: any) {
    return { success: false, error: err };
  }
}
