import { addSum } from "./js/math";
import _ from "lodash-es";

import "./css/common.css"
import "./css/common.less"
import {createApp} from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

console.log("This is main.js");
console.log("addSum 1+5=",addSum(1,5));
console.log(_.join(["abc","cba"]),"-")