package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	"zenith/ledger-engine/internal/ledger"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Engine    string `json:"engine"`
	Timestamp string `json:"timestamp"`
}

func main() {
	l := ledger.NewLedger()
	fmt.Println("[Zenith Go Ledger Engine] Initialized in-memory double-entry ledger...")

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(HealthResponse{
			Status:    "healthy",
			Engine:    "Golang High-Throughput Double-Entry Ledger",
			Timestamp: time.Now().UTC().Format(time.RFC3339),
		})
	})

	http.HandleFunc("/api/ledger/balance", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(l.GetSummary())
	})

	port := ":8080"
	fmt.Printf("[Zenith Go Ledger Engine] Listening on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
