class Mvvm {
    constructor(el,data){
        this.el = document.querySelector(el);
        this._data = data;
        this.dompool = [];
        this.init();
    }

    init(){
        this.initData();
        this.initDom();
        console.log(this.dompool);
    }

    initDom(){
        this.bindDom(this.el);
        this.bindInput(this.el);
    }

    initData(){
        this.data = {};
        const that = this
        for(let key in this._data){
            Object.defineProperty(this.data,key,{
                get(){
                    console.log("数据劫持get");
                    return that._data[key];
                },
                set(NewValue){
                    console.log("数据劫持set");
                    that.dompool[key].innerText = NewValue 
                    that._data[key] = NewValue;
                }
            })
        }
        console.log(this.data);
    }

    bindDom(el){
        const childNodes = el.childNodes;
        // console.log(el.childNodes);
        childNodes.forEach(item=>{
            // 如果是文本节点
           if(item.nodeType === 3){
            const _value = item.nodeValue;
            if(_value.trim().length){
                let _isValid = /\{\{(.+?)\}\}/.test(_value)
                if(_isValid){
                    const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
                    this.dompool[_key] = item.parentNode;
                    item.parentNode.innerText = this.data[_key] || "undefined"
                }
            }
           }
        //    如果它有孩子节点,递归遍历其孩子节点
           item.childNodes && this.bindDom(item)
        })
    }

    bindInput(el){
        const _allInputs = el.querySelectorAll("input");
        _allInputs.forEach(input=>{
            const _vModel = input.getAttribute('v-model');
            if(_vModel){
                input.addEventListener('keyup',this.handelInput.bind(this,_vModel,input),false)
            }
        })
    }

    handelInput(key,input){
        const _value = input.value;
        this.data[key] = _value;
        // console.log(this.data);
        // console.log(this._data);
    }
}