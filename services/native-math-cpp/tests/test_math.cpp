#include <iostream>
#include <cassert>
#include "financial_math.hpp"

int main() {
    std::cout << "[Zenith C++ Math Test] Running unit tests..." << std::endl;
    double overflow = Zenith::FinancialMath::CalculateOverflowIndex(10000000, 4000000);
    assert(overflow == 60.0);
    std::cout << "[Zenith C++ Math Test] Overflow calculation passed (60%)" << std::endl;
    return 0;
}
