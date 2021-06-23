const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input1.txt'), 'utf8').toString();

function find_final_floor(puzzle_input) {
    var left_bracket_count = (puzzle_input.match(/\(/g) || []).length;
    var right_bracket_count = (puzzle_input.match(/\)/g) || []).length;
    return left_bracket_count - right_bracket_count;
}

//Keeps on moving through levels until level -1 is found. Returns level + 1 because indices start at 1.
function find_basement(puzzle_input) {
    var level = 0
    for (var i = 0; i < puzzle_input.length; i++) {
        if (puzzle_input[i] == '(') {
            level++;
        } else {
            level--;
        }

        if (level == -1) {
            return i + 1;
        }
    }
}

console.log('Part 1:', find_final_floor(puzzle_input));
console.log('Part 2:', find_basement(puzzle_input));