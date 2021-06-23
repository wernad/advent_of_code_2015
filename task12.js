const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input12.txt'), 'utf8');

function find_numbers(exclude, input, numbers) {

    if (typeof input == 'number') {
        numbers.push(input);
    } else if (Array.isArray(input)) {
        input.forEach(value => find_numbers(exclude, value, numbers));
    } else if (typeof input == 'object' && !Object.values(input).includes('red')) {
        Object.values(input).forEach(value => find_numbers(exclude, value, numbers));
    }
    return numbers
}

console.log('Part 1:', puzzle_input.match(/-?\d+/gm).reduce((a, b) => +a + +b, 0));
console.log('Part 2:', find_numbers('red', JSON.parse(puzzle_input), []).reduce((a, b) => +a + +b, 0));