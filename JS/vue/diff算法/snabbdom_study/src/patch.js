import vnode from './vnode.js';
import creatElement from './createElement.js'
import patchVnode from './patchVnode.js'
export default function(oldVnode,newVnode){
    if(oldVnode.sel ==='' || oldVnode.sel === undefined){
    //    如果传入的oldVnode是dom节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode);
    }
    if(oldVnode.sel === newVnode.sel && oldVnode.key === oldVnode.key){
        console.log("是同一个节点，需要精细化比较");
        patchVnode(oldVnode, newVnode);
    }
    else{
        console.log("不是同一个节点，暴力删除旧节点，插入新节点");
        let newVnodeElm = creatElement(newVnode);
        let oldVnodeElm = oldVnode.elm;
        if(newVnodeElm){
            oldVnodeElm.parentNode.insertBefore(newVnodeElm,oldVnodeElm)
        }
        oldVnodeElm.parentNode.removeChild(oldVnodeElm);
    }
}