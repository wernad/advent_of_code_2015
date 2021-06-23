const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input18.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function generate_neighbours(current_light, grid_side) {
    let [_, x, y] = current_light.match(/(\d+),(\d+)/);
    x = +x;
    y = +y;
    let neighbours = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
        [x + 1, y + 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x - 1, y - 1],
    ];

    neighbours = neighbours.map(position => position.toString());

    if (y == (grid_side - 1) || y == 0 || x == (grid_side - 1) || x == 0) {
        for (let i = 0; i < neighbours.length; i++) {
            if (!grid.hasOwnProperty(neighbours[i])) {
                neighbours.splice(i, 1);
                i--;
            }
        }
    }

    return neighbours;
}

//Cellular Automata logic
function CA(grid, grid_side, cycles, corner_lights_on = false) {
    for (let i = 0; i < cycles; i++) {
        if (corner_lights_on) {
            grid['0,0'] = '#';
            grid[(grid_side - 1).toString() + ',0'] = '#';
            grid['0,' + (grid_side - 1).toString()] = '#';
            grid[(grid_side - 1).toString() + ',' + (grid_side - 1).toString()] = '#';
        }
        new_grid = {...grid };
        Object.keys(new_grid).map(pos => new_grid[pos] = '.');

        for (light of Object.keys(grid)) {
            let neighbours = generate_neighbours(light, grid_side);
            let on_count = 0;
            neighbours.forEach(function(neighbour_cell) {
                if (grid[neighbour_cell] == '#') on_count++;
            });

            if (grid[light] == '#' && (on_count == 2 || on_count == 3)) new_grid[light] = '#'
            else if (grid[light] == '.' && on_count == 3) new_grid[light] = '#'
            else new_grid[light] = '.';
        }

        grid = {...new_grid };
    }

    if (corner_lights_on) {
        grid['0,0'] = '#';
        grid[(grid_side - 1).toString() + ',0'] = '#';
        grid['0,' + (grid_side - 1).toString()] = '#';
        grid[(grid_side - 1).toString() + ',' + (grid_side - 1).toString()] = '#';
    }

    let turned_on_lights = 0;
    Object.values(grid).forEach(function(light_status) {
        if (light_status == '#') turned_on_lights++
    });
    return turned_on_lights;
}

let grid = {};
let x = 0;
let y = 0;
for (light_row of puzzle_input) {
    new_grid_row = [];
    for (light of light_row.split('')) {
        grid[x.toString() + ',' + y.toString()] = light;
        x++;
        if (x >= light_row.length) x = 0
    }
    y++;
}

console.log('Part 1:', CA(grid, y, 100));
console.log('Part 2:', CA(grid, y, 100, true));