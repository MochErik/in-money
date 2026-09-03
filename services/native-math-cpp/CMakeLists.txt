cmake_minimum_required(VERSION 3.20)
project(zenith_native_math VERSION 2.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

add_library(zenith_math STATIC
    src/financial_math.cpp
)

add_executable(math_test tests/test_math.cpp)
target_link_libraries(math_test PRIVATE zenith_math)
