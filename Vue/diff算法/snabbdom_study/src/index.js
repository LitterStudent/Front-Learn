import h from "./h";
import patch from "./patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

const myVnode1 = h("h1", {}, [
    h("li", {key:'A'}, "A"),
    h("li", {key:'B'}, "B"),
    h("li", {key:'C'}, "C"),
    h("li", {key:'D'}, "D"),
  ]);

// 上树
patch(container, myVnode1);

const myVnode2 = h("h1", {}, [
  h("li", {key:'F'}, "FF"),
  h("li", {key:'C'}, "C"),
  h("li", {key:'B'}, "B"),
  h("li", {key:'A'}, "Aaaaa"),
]);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
}
