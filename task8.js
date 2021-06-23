const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input8.txt'), 'utf8').toString().replace(/\r?\n|\r/g, '');

console.log('Part 1:', puzzle_input.length - puzzle_input.replace(/\\x[0-9a-f]{2}|\\[\\\"]/g, '#').replace(/\"/g, '').length);
console.log('Part 2:', puzzle_input.replace(/\\\"|\\\\/g, '####').replace(/\\x[0-9a-f]{2}/g, '#####').replace(/\"/g, '###').length - puzzle_input.length);