/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    void reorderList(ListNode* head) {
        if(!head || !head->next) return;
        stack<ListNode*> st;
        ListNode* temp = head;
        int n = 0;
        while(temp){
            st.push(temp);
            temp = temp->next;
            n++;
        }
        temp = head;
        for(int i = 0; i < n/2; i++){
            ListNode* temp2 = st.top();
            temp2->next = temp->next;
            temp->next = temp2;
            temp = temp2->next;
            st.pop();
        }
        temp->next = NULL;
        return;
    }
};

/*
    I put all the nodes in a stack of ListNode type then iterate for n/2 because we need to put first element with last first then 
    second with second last so the loop only need to run upto n/2 times to properly reorder the list.
*/