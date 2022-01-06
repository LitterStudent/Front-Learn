/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
//剑指 Offer 25. 合并两个排序的链表
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
    let head = new ListNode(-1);
    let cur = head;
    
    while(l1!==null && l2!==null){
        if(l1.val <= l2.val){
            cur.next = l1;
            cur = cur.next;
            l1 = l1.next;
        }
        else{
            cur.next =l2;
            cur = cur.next;
            l2 = l2.next
        }
    }
    
    if(l1){
        cur.next = l1;
    }
    if(l2){
        cur.next = l2;
    }
        return head.next;
    };