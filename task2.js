const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input2.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function get_wrap_paper(puzzle_input) {
    var total_wrap = 0;
    for (var i = 0; i < puzzle_input.length; i++) {
        let dimensions = puzzle_input[i].match(/\d+/g).map(x => +x);

        let sides = [dimensions[0] * dimensions[1], dimensions[1] * dimensions[2], dimensions[0] * dimensions[2]];

        let smallest_side = Math.min(...sides);

        total_wrap += 2 * (sides.reduce((a, b) => a + b, 0)) + smallest_side;
    }

    return total_wrap;
}

function get_ribbon(puzzle_input) {
    var total_ribbon = 0;
    for (var i = 0; i < puzzle_input.length; i++) {
        let dimensions = puzzle_input[i].match(/\d+/g).map(x => +x);

        let bow_length = dimensions[0] * dimensions[1] * dimensions[2];

        //Only two smallest dimensions needed for box wrap.
        dimensions.sort((a, b) => a - b);
        let box_wrap = dimensions[0] * 2 + dimensions[1] * 2;

        total_ribbon += (box_wrap + bow_length);
    }
    return total_ribbon;
}

console.log('Part 1:', get_wrap_paper(puzzle_input));
console.log('Part 2:', get_ribbon(puzzle_input));