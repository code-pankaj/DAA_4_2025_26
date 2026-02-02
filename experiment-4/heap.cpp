// UID - 24BCS12303

#include <bits/stdc++.h>

#define MAX 100

using namespace std;

int heap[MAX];
int heapSize = 0;

void heapifyUp(int index){
    while(index > 0 && heap[(index-1)/2] > heap[index]){
        swap(heap[(index-1)/2], heap[index]);
        index = (index-1) / 2;
    }
}

void heapifyDown(int index){
    int smallest = index;
    int left = 2*index + 1;
    int right = 2*index + 2;

    if(left < heapSize && heap[left] < heap[smallest]){
        smallest = left;
    }
    if(right < heapSize && heap[right] < heap[smallest]){
        smallest = right;
    }
    if(smallest != index){
        swap(heap[index], heap[smallest]);
        heapifyDown(smallest);
    }
}

void insert(int value){
    if(heapSize == MAX){
        cout << "Heap Overflow!!!\n";
        return;
    }
    heap[heapSize] = value;
    heapSize++;
    heapifyUp(heapSize-1);
}

void deleteMin(){
    if(heapSize == 0){
        cout << "Heap Underflow!!!\n";
        return;
    }
    heap[0] = heap[heapSize-1];
    heapSize--;
    heapifyDown(0);
}

void deleteValue(int value){
    if(heapSize == 0){
        cout << "Heap Underflow!!!\n";
        return;
    }

    int index = -1;
    for(int i = 0; i < heapSize; i++){
        if(heap[i] == value){
            index = i;
            break;
        }
    }

    if(index == -1){
        cout << "Value not found in heap!!!\n";
        return;
    }

    heap[index] = heap[heapSize - 1];
    heapSize--;

    if(index >= heapSize){
        return;
    }

    int parent = (index - 1) / 2;
    if(index > 0 && heap[index] < heap[parent]){
        heapifyUp(index);
    }else{
        heapifyDown(index);
    }
}

int main(){
    insert(2);
    insert(4);
    insert(6);
    insert(1);
    insert(8);
    insert(3);

    deleteMin();
    deleteValue(4);

    for(int i = 0; i < heapSize; i++){
        cout << heap[i] << " ";
    }
    cout << endl;
    return 0;
}
