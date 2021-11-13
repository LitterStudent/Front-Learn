const dd = require("loader-utils");
const { validate } = require('schema-utils')
const schema = require('./schema.json');

module.exports = function(content,map,meta){
     console.log(dd);
    // const options = this.getOptions(this);
    // console.log(333,options);
    // // 校验
    // validate(schema,options,{
    //     name:'33'
    // })
    return content;
}

module.exports.pitch = function(){
    console.log(333);
}