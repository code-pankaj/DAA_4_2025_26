**Question:** Why is the complexity O(n) instead of O(n log n) in deleteValue?

**Answer:** 

The deleteValue function has O(n) complexity because:

1. **Search Operation: O(n)** - We first search for the value to be deleted, which takes O(n) time in the worst case.

2. **Replacement: O(1)** - After finding the index, we replace it with the last element and reduce the heap size by 1.

3. **Heapify: O(log n)** - We then call either heapifyUp or heapifyDown based on the position of the replaced element. Both operations take O(log n) time in the worst case.

**Overall Complexity:** O(n) + O(log n) = **O(n)**

Since the search operation dominates with O(n) time, the overall time complexity is O(n) in the worst case.
