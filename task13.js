const path = require('path');
const fs = require('fs');
const itertools = require('itertools');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input13.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function optimize_seating(arrangements, rules) {
    let happiness_values = new Set();
    arrangements.forEach(function(seating) {

        let current_happiness = 0;
        for (let i = 0; i < seating.length; i++) {
            if (i == 0) {
                current_happiness += rules[seating[i] + seating[seating.length - 1]];
                current_happiness += rules[seating[i] + seating[i + 1]];
            } else if (i == seating.length - 1) {
                current_happiness += rules[seating[i] + seating[i - 1]];
                current_happiness += rules[seating[i] + seating[0]];
            } else {
                current_happiness += rules[seating[i] + seating[i - 1]];
                current_happiness += rules[seating[i] + seating[i + 1]];
            }

        }
        happiness_values.add(current_happiness);
    });

    return Math.max(...happiness_values);
}

let rules = {};
let guests = new Set();

puzzle_input.forEach(function(rule) {
    let [_, guest1, change, amount, guest2] = rule.match(/([a-zA-Z]+) would (gain|lose) (\d+) happiness units by sitting next to ([a-zA-Z]+)/);
    rules[guest1 + guest2] = (change == 'gain') ? +amount : -amount;
    guests.add(guest1);
});

//I don't have an effect on happiness.
guests.forEach(function(guest) {
    rules[guest + 'Me'] = 0;
    rules['Me' + guest] = 0;
});

let seating_perms = Array.from(itertools.permutations(guests));

guests.add('Me');
let seating_perms_with_me = Array.from(itertools.permutations(guests));

console.log('Part 1:', optimize_seating(seating_perms, rules));
console.log('Part 2:', optimize_seating(seating_perms_with_me, rules));