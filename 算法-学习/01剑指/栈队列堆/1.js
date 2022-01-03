var CQueue = function() {
    this.stack1 = [],
    this.stack2 = [];
    return null;
};

/** 
* @param {number} value
* @return {void}
*/
CQueue.prototype.appendTail = function(value) {
this.stack1.push(value);
return null
};

/**
* @return {number}
*/
CQueue.prototype.deleteHead = function() {
  if(this.stack2.length > 0){
      return this.stack2.pop();
  }
  else if(this.stack1.length > 0){
      const length = this.stack1.length;
      for(let i =0;i<length;i++){
          this.stack2.push(this.stack1.pop())
      }
      return this.stack2.pop()
  }
  else{
      return -1;
  }
};

/**
* Your CQueue object will be instantiated and called as such:
* var obj = new CQueue()
* obj.appendTail(value)
* var param_2 = obj.deleteHead()
*/

var obj = new CQueue()
var a1 = obj.deleteHead()
obj.appendTail(2)
obj.appendTail(5)
var param_2 = obj.deleteHead()
var param_3 = obj.deleteHead()