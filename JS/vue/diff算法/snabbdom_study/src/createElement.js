export default function createElement(vnode){
  let domNode = document.createElement(vnode.sel);
  if(vnode.text !=='' &&
    (vnode.children === undefined || vnode.children.length === 0)
  ){
      domNode.innerText = vnode.text
  }
  else if(Array.isArray(vnode.children)&&vnode.children.length>0){
    for (let ch of vnode.children) {
        // 递归调用 创建出它的DOM，一旦调用createElement意味着创建出DOM了。并且它的elm属性指向了创建出的dom，但是没有上树，是一个孤儿节点
        let chDOM = createElement(ch); // 得到 子节点 表示的 DOM节点 递归最后返回的一定是文本节点
        // 文本节点 上domNode树
        domNode.appendChild(chDOM);
      }
  }
  // 补充虚拟节点的elm属性
  vnode.elm = domNode;
  // 返回domNode DOM对象
  return domNode;
}