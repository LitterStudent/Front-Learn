//node 导入模块，import会被转成require 
//首先寻找 是否有router.js或者router.node,
//如果没有看是否有router目录,
//如果有router目录会在其下寻找package.json文件,
//如果有则按照package的配置来导入
//如果没有package.json,看是否有index.js
//或者index.node,如果有就导入没有就失败

import Vue from "vue" 
// console.log("index.js");

let app = new Vue({
    el:"app",
    data(){
        return {
            title:"学生列表",
            classNum:['1','2'],
            stutdnds:[
                {
                    name:"小米",
                    age:18
                },
                {
                    name:"小红",
                    age:20
                }
            ],
            teacher:{
                xiaohong:{
                    name:"hong",
                    age:44
                },
                xiaoming:{
                    name:"ming",
                    age:33
                }
            }
           
        }
    }
})

console.log(app);
console.log(app.classNum[1]);