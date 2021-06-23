const path = require('path');
const fs = require('fs');
const itertools = require('iterator-tools')


const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input17.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item).map(item => +item);

function store_eggnog(total_liters, buckets) {
    let valid_combs = [];
    for (let i = 1; i <= buckets.length; i++) {
        let bucket_combinations = itertools.combinations(buckets, i);
        for (comb of bucket_combinations) {
            if (comb.reduce((a, b) => a + b, 0) === total_liters) {
                valid_combs.push(comb.slice());
            }
        }
    }

    return valid_combs;
}

console.log('Part 1:', store_eggnog(150, puzzle_input).length);
console.log('Part 1:', Math.min(...store_eggnog(150, puzzle_input).map(arr => arr.length)));