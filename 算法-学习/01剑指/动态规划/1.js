var lengthOfLongestSubstring = function(s) {
    const dp = [1];
    let set = new map(s[0],0);
    let  max = 1;
    for(let i=1;i<s.length;i++){
        if(!set.has(s[i])){
            dp[i] = dp[i-1]+1;
            if(dp[i] > max){
                max = dp[i]
            }
        }
        else{
            dp[i] = 1;
            set = new Set(s[i])
        }
    }
    return max
    };
    lengthOfLongestSubstring("abcabcbb")