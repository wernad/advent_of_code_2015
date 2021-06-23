const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input7.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function connect_wires(input) {
    let wires = {};

    while (input.length) {
        const string = input.shift();
        let [left_side, c] = string.split(' -> ');
        let [_, a, opcode, b] = left_side.match(/([a-z\d+]+)?\b ?([A-Z]+)? ?([a-z\d+]+)?/);

        let check_param = (x) => (wires.hasOwnProperty(x)) ? wires[x] : +x;

        if (wires.hasOwnProperty(c)) {
            continue;
        }

        if ((!a || +a == +a || wires.hasOwnProperty(a)) && (!b || +b == +b || wires.hasOwnProperty(b))) {
            let param1 = check_param(a);
            let param2 = check_param(b);

            switch (opcode) {
                case 'AND':
                    wires[c] = param1 & param2;
                    break;
                case 'OR':
                    wires[c] = param1 | param2;
                    break;
                case 'NOT':
                    wires[c] = param2 ^ 65535;
                    break;
                case 'LSHIFT':
                    wires[c] = param1 << param2;
                    break;
                case 'RSHIFT':
                    wires[c] = param1 >> param2;
                    break;
                default:
                    wires[c] = param1;
                    break;
            }

        } else {
            input.push(string);
            continue;
        }

    }

    return wires;
}

let puzzle_input_copy = [...puzzle_input];
var wire_a = connect_wires(puzzle_input)['a'];

puzzle_input_copy[puzzle_input_copy.findIndex(elem => /^.+ -> b$/.test(elem))] = wire_a + ' -> b';

console.log('Part 1:', wire_a);
console.log('Part 2:', connect_wires(puzzle_input_copy)['a']);