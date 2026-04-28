#include <iostream>
#include <vector>

using namespace std;

int n;
vector<vector<int>> cost;
vector<vector<int>> dp;

int tsp(int mask, int pos) {
    if (mask == (1 << n) - 1)
        return cost[pos][0];

    if (dp[mask][pos] != -1)
        return dp[mask][pos];

    int ans = __INT_MAX__;

    for (int city = 0; city < n; city++) {
        if ((mask & (1 << city)) == 0) {
            int res = cost[pos][city] + tsp(mask | (1 << city), city);
            ans = min(ans, res);
        }
    }

    return dp[mask][pos] = ans;
}

int main() {
    cin >> n;

    cost.resize(n, vector<int>(n));
    dp.assign(1 << n, vector<int>(n, -1));

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> cost[i][j];

    cout << tsp(1, 0) << endl;

    return 0;
}
