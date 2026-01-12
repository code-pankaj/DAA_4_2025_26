// UID - 24BCS12303

#include <bits/stdc++.h>
using namespace std;
using namespace std::chrono;
int maxDepth = 0;
long long operation = 0;

void complexRec(int n, int depth) {
    
    maxDepth = max(maxDepth, depth);
    if (n <= 2) {
       operation++;
       return;
   }

   int p = n;
   while (p > 0) {
       operation++;
       vector<int> temp(n);
       for (int i = 0; i < n; i++) {
           temp[i] = i ^ p;
           operation++;
       }
       p >>= 1;
   }


   vector<int> small(n);
   for (int i = 0; i < n; i++) {
       small[i] = i * i;
       operation++;
   }


   if (n % 3 == 0) {
       reverse(small.begin(), small.end());
       operation++;
   } else {
       reverse(small.begin(), small.end());
       operation++;
   }
   
   complexRec(n / 2, depth + 1);
   complexRec(n / 2, depth + 1);
   complexRec(n / 2, depth + 1);
}

int main() {
    int n;
    cout << "Input : " ;
    cin >> n;
    auto start = high_resolution_clock::now();
    complexRec(n, 1);
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<milliseconds>(end - start);
    cout << "Depth : " << maxDepth << endl;
    cout << "Operation : " << operation << endl;
    cout << "Time Taken : " << duration.count() << " ms" << endl;
    return 0;
}

// Recurrence Relation -  T(n) = 3T(n/2) + nlogn

// Using master theorem Case 1 - a > b^k

// a = 3, b = 2, k = 1, p = 1

// Time Complexity - O(n^log(base2)3)

