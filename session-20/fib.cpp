#include <iostream>
#include <vector>

using namespace std;

vector<int> dp;

int fib(int n){
    if(n == 1) return 1;
    if(n == 0) return 0;
    if(dp[n] != -1) return dp[n];
    dp[n] = fib(n-1) + fib(n-2);
    return dp[n];
}

int main(){
    int n;
    cin >> n;
    dp.resize(n+1, -1);
    cout << fib(n) << endl;
    return 0;
}