var kSmallestPairs = function(nums1, nums2, k) {
    let res = []
    let i = 0, j = 0;
    let sum1 = [],sum2 = [];
    for(let i=1;i<nums1.length;i++){
        sum1.push(nums1[i]-nums1[i-1])
    }
    for(let i=1;i<nums2.length;i++){
        sum2.push(nums2[i]-nums2[i-1])
    }
    while(res.length<k){
        res.push(nums1[i],nums2[j]);
        if(sum1[i] && !sum2[j]){
            i++;
            continue;
        }
        if(sum2[j] && !sum1[i]){
            j++;
            continue;
        }
        if(!sum1[i] && !sum2[j]){
            break;
        }
        if(sum1[i] <= sum2[j]){
            i++
        }
        else{
            j++;
        }
    }
    return res;
    };

    kSmallestPairs([1,1,2],[1,2,3],2)