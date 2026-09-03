#include "financial_math.hpp"
#include <cmath>

namespace Zenith {
    double FinancialMath::CalculateCompoundInterest(double principal, double rate, int periods) {
        return principal * std::pow((1.0 + rate), periods);
    }

    double FinancialMath::CalculateOverflowIndex(double income, double expense) {
        if (income <= 0.0) return expense > 0 ? -100.0 : 0.0;
        return ((income - expense) / income) * 100.0;
    }

    double FinancialMath::SimulateRunwayMonths(double totalBalance, double monthlyBurn) {
        if (monthlyBurn <= 0.0) return 999.0;
        return totalBalance / monthlyBurn;
    }
}
