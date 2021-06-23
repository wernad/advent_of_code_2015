const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input19.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

String.prototype.replaceAt = function(index, substring, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + substring.length);
}

function create_molecules() {
    let med_copy = medicine;
    let new_molecules = new Set();

    for (let [input_molecule, output_molecules] of Object.entries(reactions)) {
        let indices_to_replace = [...med_copy.matchAll(new RegExp(input_molecule, 'g'))].map(match => match.index);

        indices_to_replace.forEach(function(index) {
            output_molecules.forEach(molecule => new_molecules.add(med_copy.replaceAt(index, input_molecule, molecule)));
        });

    }

    return new_molecules;
}

var reactions = {};
var medicine = puzzle_input.pop();

puzzle_input.forEach(function(reaction) {
    let [l_side, r_side] = reaction.split(' => ');
    if (reactions.hasOwnProperty(l_side)) reactions[l_side].push(r_side);
    else reactions[l_side] = [r_side];
});

console.log('Part 1:', create_molecules().size);