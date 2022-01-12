function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
var d1 = makeDate(12345678);
var f1 = function () {
    return true;
};
var f2 = function () { return true; };
var f3 = function () {
    return true;
};
var v1 = f1();
var v2 = f2();
var v3 = f3();
console.log(v1, v2, v3);
