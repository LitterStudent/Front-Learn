class EventBus {
    
    constructor () {
        this.map = new Map();
    }

    on(type, callback) {
        let fns = this.map.get(type) || [];
        fns.push(callback);
        this.map.set(type, fns);
    }

    emit(type, ...args) {
        const context = this;
        let fns = this.map.get(type) || [];
        fns.forEach(fn => {
            fn.call(context, ...args);
        })
    }
    
}

let e = new EventBus();

e.on('test', () => {
    console.log('test');
});

e.on('test', (a) => {
    console.log(a);
});

e.emit('test', 1);

// test
// 1