const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input16.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function find_aunt(aunt_to_find) {
    let aunts_numbers = Object.keys(aunts);
    for (aunt_num of aunts_numbers) {
        current_aunt_items = Object.keys(aunts[aunt_num]);
        current_aunt_amount = Object.values(aunts[aunt_num]);
        if (aunt_to_find[current_aunt_items[0]] == current_aunt_amount[0] &&
            aunt_to_find[current_aunt_items[1]] == current_aunt_amount[1] &&
            aunt_to_find[current_aunt_items[2]] == current_aunt_amount[2]) {

            return aunt_num;
        }
    }
}

function find_real_aunt(aunt_to_find) {
    let aunts_numbers = Object.keys(aunts);
    for (aunt_num of aunts_numbers) {
        let flag = true;
        for (let [item, amount] of Object.entries(aunts[aunt_num])) {
            switch (item) {
                case 'cats':
                case 'trees':
                    if (amount < aunt_to_find[item]) flag = false;
                    break;
                case 'pomeranians':
                case 'goldfish':
                    if (amount > aunt_to_find[item]) flag = false;
                    break;
                default:
                    if (amount != aunt_to_find[item]) flag = false;
                    break;
            }
        }
        if (flag) return aunt_num
    }
}

let aunt_to_find = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
}

var aunts = {}
puzzle_input.forEach(function(aunt) {
    let [_, aunt_number, key1, value1, key2, value2, key3, value3] = aunt.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
    aunts[aunt_number] = {
        [key1]: +value1,
        [key2]: +value2,
        [key3]: +value3
    }
});

console.log('Part 1:', find_aunt(aunt_to_find));
console.log('Part 2:', find_real_aunt(aunt_to_find));