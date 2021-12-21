const img1 = require('../image/1.png')
const img2 = require('../image/2.png')

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
