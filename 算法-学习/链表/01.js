function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

let head = new Node(7);
head.next = new Node(13);
