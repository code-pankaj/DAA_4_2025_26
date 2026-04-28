#include <iostream>
#include <vector>

using namespace std;

vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {
    vector<int> dist(V, __INT_MAX__);
    dist[src] = 0;

    for (int i = 0; i < V - 1; i++) {
        for (auto& e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != 1e8 && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }

    for (auto& e : edges) {
        int u = e[0], v = e[1], w = e[2];
        if (dist[u] != 1e8 && dist[u] + w < dist[v])
            return {-1};
    }

    return dist;
}

int main() {
    int V, E, src;
    cin >> V >> E >> src;

    vector<vector<int>> edges(E);
    for (int i = 0; i < E; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        edges[i] = {u, v, w};
    }

    vector<int> ans = bellmanFord(V, edges, src);

    for (int x : ans)
        cout << x << " ";
    cout << endl;

    return 0;
}
