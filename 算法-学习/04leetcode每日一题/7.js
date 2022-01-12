/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var increasingTriplet = function(nums) {
    let left;
    for(let i=1;i<nums.length;i++){
        let mid = nums[i];
        left = false
        for(let j=0;j<i;j++){
            if(nums[j]<mid){
                left = true;
                break;
            }
        }
        for(let j=nums.length-1;j>i;j--){
            if(nums[j]>mid){
                if(left){
                    return true
                }
            }
        }
    }
    return false
    };

    console.log(increasingTriplet([6,7,1,2]));