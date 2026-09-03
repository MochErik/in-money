package ledger

import (
	"sync"
	"time"
)

type EntryType string

const (
	Debit  EntryType = "DEBIT"
	Credit EntryType = "CREDIT"
)

type Entry struct {
	ID        string    `json:"id"`
	Account   string    `json:"account"`
	Amount    int64     `json:"amount"` // Stored in minor currency units / Rupiah
	Type      EntryType `json:"type"`
	Timestamp time.Time `json:"timestamp"`
}

type Ledger struct {
	mu      sync.RWMutex
	entries []Entry
}

func NewLedger() *Ledger {
	return &Ledger{
		entries: make([]Entry, 0),
	}
}

func (l *Ledger) AddTransaction(account string, amount int64, entryType EntryType) {
	l.mu.Lock()
	defer l.mu.Unlock()

	l.entries = append(l.entries, Entry{
		ID:        time.Now().Format("20060102150405.000"),
		Account:   account,
		Amount:    amount,
		Type:      entryType,
		Timestamp: time.Now(),
	})
}

func (l *Ledger) GetSummary() map[string]interface{} {
	l.mu.RLock()
	defer l.mu.RUnlock()

	var totalDebit, totalCredit int64
	for _, e := range l.entries {
		if e.Type == Debit {
			totalDebit += e.Amount
		} else {
			totalCredit += e.Amount
		}
	}

	return map[string]interface{}{
		"total_entries": len(l.entries),
		"total_debit":   totalDebit,
		"total_credit":  totalCredit,
		"is_balanced":   totalDebit == totalCredit,
	}
}
