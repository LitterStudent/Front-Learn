// https://www.nowcoder.com/practice/fc533c45b73a41b0b44ccba763f866ef?tpId=13&tqId=11209&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking&from=cyc_github
// 删除链表中重复的结点

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead)
{
    // write code here
    if(pHead == null || pHead.next == null){
        return pHead
    }

    // 将头部相同的数字清除
    // 确保 第一个链表节点和第二个链表节点的数不同，这样才能确认 pHead的位置
    // 两种方法 
    // 1.直接遍历删除
    // 2.创造出一个 vHead 在 pHead 前面
    //   返回时 返回 vHead.next
    let vHead = new ListNode(-1);
    vHead.next = pHead
    let pre = vHead;
    let next = pHead;
    while(next.val == pHead.val){
        while(next && next.val == pHead.val){
            next = next.next;
        }
        pHead = next;
        if(next){
            next = next.next
            if(!next){
                return pHead
            }
        }
        else{
            return pHead
        }
    }
    let pre = pHead;
    while(next){
        if(next.next && next.val == next.next.val){
            next = next.next;
            while(next.next && next.val == next.next.val){
                next = next.next
            }
            next = next.next;
            pre.next = next
        }
        else{
            pre = next;
            next = next.next
        }
    }
    return pHead
}
module.exports = {
    deleteDuplication : deleteDuplication
};