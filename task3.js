const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input3.txt'), 'utf8').toString();

//Calculates numbero of elements/keys in dictionary.
function get_dict_length(dict) {
    count = 0;
    for (i in dict) {
        count++;
    }
    return count;
}

function move(direction, x, y) {
    switch (direction) {
        case '<':
            x--;
            break;
        case '>':
            x++;
            break;
        case '^':
            y--;
            break;
        case 'v':
            y++;
            break;
    }

    return [x, y];
}

function solo_delivery(puzzle_input) {
    let x = 0;
    let y = 0;
    var houses = {
        '0,0': 1
    };
    for (let i = 0; i < puzzle_input.length; i++) {

        [x, y] = move(puzzle_input[i], x, y);
        let new_pos = [x, y];

        //If we are at the same house, just increment number of gifts.
        if (new_pos in houses) {
            houses[new_pos] += 1;
        } else {
            houses[new_pos] = 1;
        }
    }

    return houses;
}

//Similar to solo, but iterates over two instructions instead, for both Santas.
function duo_delivery(puzzle_input) {
    let Santa = {
        'x': 0,
        'y': 0,
    }
    let Robo_Santa = {
        'x': 0,
        'y': 0,
    }
    var houses = {
        '0,0': 1
    };

    for (let i = 0; i < puzzle_input.length; i += 2) {
        [Robo_Santa['x'], Robo_Santa['y']] = move(puzzle_input[i], Robo_Santa['x'], Robo_Santa['y']);
        let new_pos = [Robo_Santa['x'], Robo_Santa['y']];

        if (new_pos in houses) {
            houses[new_pos] += 1;
        } else {
            houses[new_pos] = 1;
        }

        [Santa['x'], Santa['y']] = move(puzzle_input[i + 1], Santa['x'], Santa['y']);
        new_pos = [Santa['x'], Santa['y']];

        if (new_pos in houses) {
            houses[new_pos] += 1;
        } else {
            houses[new_pos] = 1;
        }
    }
    return houses;
}

console.log('Part 1:', get_dict_length(solo_delivery(puzzle_input)));
console.log('Part 2:', get_dict_length(duo_delivery(puzzle_input)));