// index.js

// 引入createElement、render和renderDom方法
import { createElement, render, renderDom } from './03element.js';
import diff from './04diff';
import patch from './05patch';

let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
]);

console.log(virtualDom);

// +++
let el = render(virtualDom); // 渲染虚拟DOM得到真实的DOM结构
console.log(el);
// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root'));
// +++


let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item active'}, ['七里香']),
    createElement('li', {class: 'item'}, ['一千年以后']),
    createElement('li', {class: 'item'}, ['需要人陪'])    
]);
// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
console.log(patches);
// 将变化打补丁，更新到el
patch(el, patches);
// +++

