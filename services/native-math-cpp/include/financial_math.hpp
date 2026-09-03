#ifndef FINANCIAL_MATH_HPP
#define FINANCIAL_MATH_HPP

#include <vector>
#include <string>

namespace Zenith {
    class FinancialMath {
    public:
        static double CalculateCompoundInterest(double principal, double rate, int periods);
        static double CalculateOverflowIndex(double income, double expense);
        static double SimulateRunwayMonths(double totalBalance, double monthlyBurn);
    };
}

#endif
