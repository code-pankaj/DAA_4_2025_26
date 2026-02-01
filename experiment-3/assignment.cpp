// UID - 24BCS12303

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

int main() {
    int n;
    cin >> n;

    vector<char> input(n);
    for (int i = 0; i < n; i++) {
        cin >> input[i];
    }

    unordered_map<int, int> mpp;
    
    int ans = 0;
    int sum = 0;

    mpp[0] = -1;

    for (int i = 0; i < n; i++) {
        if (input[i] == 'P') {
            sum++;
        } else {
            sum--;
        }

        if (mpp.count(sum)) {
            int len = i - mpp[sum];
            if (len > ans) {
                ans = len;
            }
        } else {
            mpp[sum] = i;
        }
    }

    cout << ans << endl;

    return 0;
}