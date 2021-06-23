const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input5.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

//Similar to groupBy from Python's itertools library, but returns counts instead of groups and keys.
function count_grouped_chars(string) {
    let counts = [];
    let new_key;
    let new_count = 0;
    for (const [index, chr] of string.entries()) {

        if (chr == new_key || new_key === undefined) {
            new_key = chr;
            new_count++;
            //Pushes if string ends with grouped letters.
            if (index == string.length - 1) {
                counts.push(new_count);
            }

            continue
        }
        counts.push(new_count);
        new_count = 1
        new_key = chr
    }

    return counts
}

function check_strings_part1(puzzle_input) {
    var nice_strings_count = 0;
    for (const string of puzzle_input) {
        if (string.match(/ab|cd|pq|xy/)) {
            continue;
        }

        if ((string.match(/[a,e,i,o,u]/g) || []).length < 3) {
            continue;
        }

        if (Math.max(...count_grouped_chars(string.split(''))) < 2) {
            continue;
        }

        nice_strings_count++;
    }

    return nice_strings_count;
}

function check_strings_part2(puzzle_input) {
    var nice_strings_count = 0;
    for (const string of puzzle_input) {
        //e.g.: 'ab....ab'. Number of letters inbetween is irrelevant.
        let pair_found = false;
        for (var i = 0; i < string.length - 1; i++) {
            let a = string[i];
            let b = string[i + 1];
            if (string.slice(i + 2).search(a + b) != -1) {
                pair_found = true;
                break;
            }
        }
        //e.g.: 'xyx'
        let triplet_found = false;
        for (var i = 0; i < string.length - 2; i++) {
            let a = string[i];
            let b = string[i + 2];
            if (a == b) {
                triplet_found = true;
                break;
            }
        }

        if (pair_found && triplet_found) { nice_strings_count++; }
    }

    return nice_strings_count;
}


console.log('Part 1:', check_strings_part1(puzzle_input));
console.log('Part 2:', check_strings_part2(puzzle_input));