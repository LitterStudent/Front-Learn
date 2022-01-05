// 剑指 Offer 58 - I. 翻转单词顺序
var reverseWords = function(s) {
    let i=0,j=s.length-1;
    // 消除首尾空格
    while(s[0]===' '){
        s=s.slice(1)
    }
    while(s[s.length-1]=== ' '){
        s=s.slice(0,s.length-1)
    }
    let arr = [];
    
     i =0,j = 0;
    while(j<s.length-1){
        while(s[j]!==' ' && j<=(s.length-1)){
            j++;
        }
        arr.push(s.slice(i,j));
        j++;
        while(s[j] == ' '){
            j++;
        }
        i = j;
    }
    
    
    return  arr.reverse().join(' ');
    
    };

    reverseWords("   a   b ")