// 堆是具有以下性质的完全二叉树：
// 每个结点的值都大于或等于其左右孩子结点的值，称为大顶堆；
// 或者每个结点的值都小于或等于其左右孩子结点的值，称为小顶堆。
// 满足该条件的完全二叉树为大根堆
//
//     5
//   4   3
//  3 2  2 1

// 堆排序
// 将一个无序数组 的每一个数都上升的最高端（从下到上），升一个数O(logN)。
// 升完整个数组 为 N*O(logN)
//1 将 生成的大根堆的 最大值与最后一个数交换，然后交换后的
//2 第一个数下沉到属于它的位置 O(logN)
// 0——n-1就变成 大根堆 O(logN)
//重复 1 2
// 最后 N*O(logN)*2
// 堆的额外空间为 O(1)
// 堆 弹出一个数和加入一个数都为 n(log2n)

// 默认大根堆
const defaultCmp = (x,y) => x > y;

const swap = (arr,i,j) => ([arr[i],arr[j]] = [arr[j],arr[i]])

// 堆类
class Heap {
    constructor(cmp = defaultCmp){
        this.container = [];
        this.cmp = cmp;
    }
    // 在堆底插入元素，再将该元素 上浮。 o(logn)
    insert(data){
        const { container, cmp } = this;
        container.push(data);
        let index = container.length - 1;
        while(index){
            let parentIndex = Math.floor((index - 1) / 2);
            if(!cmp(container[index],container[parentIndex])){
                return ;
            }
            swap(container,index,parentIndex);
            index = parentIndex;
        }
    }

    // index元素下沉
    adjustHeap(index,length){
        const { container } = this;
        let k = index*2+1;
        //  下沉
        while(k<length){
            if(k+1<length && container[k]<container[k+1]){
                k++;
            }
            if(container[k] > container[index]){
                swap(container,index,k)
                index = k;
                k = k*2+1;
            }else{
                break;
            }
        }
    }

    sort(){
        const { container } = this
        const length = container.length
        for(let i=0;i<length;i++){
            swap(container,0,length-i-1);
            this.adjustHeap(0,length-i-1);
        }
    }


    // 将堆顶元素 与 堆底元素 交互 ，再弹出堆底元素  
    // 将将堆顶元素下沉 o(logn)
    pop(){
        const { container, cmp } = this;
        if(!container.length){
            return null;
        }
        const length = container.length
        swap(container,0,length-1)
        const res = container.pop();

        let index = 0,
            exchange = index*2 + 1;
        // 堆顶元素下沉
        while(exchange<length){
            exchange = cmp(container[exchange],container[exchange+1])? exchange : exchange+1;
            if(cmp(container[index],container[exchange])){
                break;
            }
            swap(container,index,exchange);
            index = exchange;
            exchange = index*2+1;
        }
        return res
    }
}

let heap = new Heap();

let arr = [1,2,3,4,5,6,7];

for(let i=0;i<arr.length;i++){
    heap.insert(arr[i])
}
console.log(heap.container);

let heap2 = new Heap();
let arr2 = [7,6,5,4,3,2,1,100,1,5,666];
for(let i=0;i<arr2.length;i++){
    heap2.insert(arr2[i])
}
console.log(heap2.sort());
console.log(heap2.container);