import patchVnode from "./patchVnode";
import createElement from "./createElement";
function checkSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log("孩子比较");
    console.log(oldCh, newCh);
    let oldStartIndex = 0;
    let newStartIndex = 0;
    let oldEndIndex = oldCh.length - 1;
    let newEndIndex = newCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIndex];
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIndex];
    let keyMap = null;

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            console.log("第一种比较");
            // 精细化比较，对比后进行dom的改变
            patchVnode(oldStartVnode.newStartVnode);
            oldStartVnode = oldCh[oldStartIndex++];
            newStartVnode = newCh[newStartIndex++];
        }
        else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            //新后与旧后
            console.log("第2种比较");
            // 精细化比较，对比后进行dom的改变
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[oldEndIndex--];
            newEndVnode = newCh[newEndIndex--];
        }
        else if (checkSameVnode(newEndVnode, oldStartVnode)) {
            //新后与旧前
            console.log("第3种比较");
            // 精细化比较，对比后进行的节点进行改变
            patchVnode(oldStartVnode, newEndVnode);
            // 当③新后与旧前命中的时候，此时要移动节点。移动 新后（旧前） 指向的这个节点到老节点的 旧后的后面
            // 移动节点：只要插入一个已经在DOM树上 的节点，就会被移动
            // 改变节点的位置
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIndex];
            newEndVnode = newCh[--newEndIndex];
        }
        else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            //新前与旧后
            console.log("第4种比较");
            patchVnode(oldEndVnode, newStartVnode);
            // 当④新前与旧后命中的时候，此时要移动节点。移动 新前（旧后） 指向的这个节点到老节点的 旧前的前面
            // 移动节点：只要插入一个已经在DOM树上的节点，就会被移动
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIndex];
            newStartVnode = newCh[++newStartIndex];
        }
        else {
            // 四种都没有匹配到，都没有命中
            console.log("四种都没有命中");
            // 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了
            if (!keyMap) {
                keyMap = {};
                // 记录oldVnode中的节点出现的key
                // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
                for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                    const key = oldCh[i].key;
                    if (key !== undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            console.log(keyMap);
            // 寻找当前项（newStartIdx）在keyMap中映射的序号
            const idxInOld = keyMap[newStartVnode.key];
            if (idxInOld === undefined) {
                // 如果 idxInOld 是 undefined 说明是全新的项，要插入
                // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
                // 说明不是全新的项，要移动
                const elmToMove = oldCh[idxInOld];
                patchVnode(elmToMove, newStartVnode);
                // 把这项设置为undefined，表示我已经处理完这项了
                oldCh[idxInOld] = undefined;
                // 移动，调用insertBefore也可以实现移动。
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
            }

            // newStartIdx++;
            newStartVnode = newCh[++newStartIndex];
        }
    }

    // 循环结束
    if (newStartIndex <= newEndIndex) {
        // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIndex].elm);
        }
    } else if (oldStartIndex <= oldEndIndex) {
        // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}