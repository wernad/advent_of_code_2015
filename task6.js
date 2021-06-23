const path = require('path');
const fs = require('fs');

var puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input6.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function extract_coordinates(string) {
    let coordinates = string.match(/\d+,\d+/g);
    let coord_a = coordinates[0].match(/\d+/g).map(x => Number(x));
    let coord_b = coordinates[1].match(/\d+/g).map(x => Number(x));

    return [coord_a, coord_b]
}

function setup_lights(puzzle_input) {
    let lights = new Set(); //Contains only lights that are on.
    for (const string of puzzle_input) {
        let [coord_a, coord_b] = extract_coordinates(string);
        for (let i = coord_a[1]; i <= coord_b[1]; i++) {
            for (let j = coord_a[0]; j <= coord_b[0]; j++) {
                let pos = [i, j];
                switch (string.match(/(turn on)|(turn off)|(toggle)/g)[0]) {
                    case 'turn on':
                        if (!(lights.has([i, j].toString()))) {
                            lights.add([i, j].toString());
                        }
                        break;
                    case 'turn off':
                        if (lights.has([i, j].toString())) {
                            lights.delete([i, j].toString());
                        }
                        break;
                    case 'toggle':
                        if (lights.has([i, j].toString())) {
                            lights.delete([i, j].toString());
                        } else if (!(lights.has([i, j].toString()))) {
                            lights.add([i, j].toString());
                        }
                        break;

                }
            }
        }

    }
    return lights;
}

function set_brightness(puzzle_input) {
    let lights = {}; //Light's coordinate : Light's brightness level.
    for (const string of puzzle_input) {
        let [coord_a, coord_b] = extract_coordinates(string);
        for (let i = coord_a[1]; i <= coord_b[1]; i++) {
            for (let j = coord_a[0]; j <= coord_b[0]; j++) {
                let pos = [i, j];
                switch (string.match(/(turn on)|(turn off)|(toggle)/g)[0]) {
                    case 'turn on':
                        lights[pos] = (pos in lights) ? lights[pos] + 1 : 1;
                        break;
                    case 'turn off':
                        if (pos in lights) {
                            lights[pos] = (lights[pos] <= 1) ? 0 : lights[pos] - 1;
                        }
                        break;
                    case 'toggle':
                        lights[pos] = (pos in lights) ? lights[pos] + 2 : 2;
                        break;

                }
            }
        }

    }
    return lights;
}

function sum_dict(dict) {
    let sum = 0;
    for (let x in dict) {
        sum += dict[x]
    }
    return sum;
}

console.log('Part 1:', setup_lights(puzzle_input).size);
console.log('Part 2:', sum_dict(set_brightness(puzzle_input)));