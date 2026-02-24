// 24BCS12303

#include <bits/stdc++.h>

using namespace std;

int main(){
    int V, E;
    cin >> V >> E ;

    vector<vector<pair<int, int>>> adj(V);

    for(int i = 0; i < E; i++){
        int u, v, w;
        cin >> u >> v >> w ;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    vector<bool> visited(V, false);
    priority_queue<pair<int, int> , vector<pair<int, int>> , greater<pair<int, int>>> pq;
    pq.push({0,0});

    int minCost = 0;
    
    while(!pq.empty()){
        int wi = pq.top().first;
        int ui = pq.top().second;

        pq.pop();
        visited[ui] = true;

        minCost += wi;
        for(auto pr: adj[ui]){
            int vi = pr.first;
            int currW = pr.second;
            if(!visited[vi]){
                pq.push({vi, currW});
            }
        }

    }
    cout << minCost << endl;
    return 0;
}


// Time Complexity --> O((V+E)logV)

// Can be written as O(ElogV) when V=E