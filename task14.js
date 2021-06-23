const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input14.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function reset_reindeers(reindeers) {
    reindeers.forEach(function(reindeer) {
        reindeer['distance'] = 0;
        reindeer['current_end'] = reindeer['max_end'];
        reindeer['current_rest'] = reindeer['max_rest'];
    });

    return reindeers;
}

function race(reindeers, race_end) {
    for (let i = 0; i < race_end; i++) {
        reindeers.forEach(function(reindeer) {
            if (reindeer['current_end'] > 0) {
                reindeer['current_end']--;
                reindeer['distance'] += reindeer['speed'];
            } else if (reindeer['current_rest'] > 0) reindeer['current_rest']--;
            else {
                reindeer['current_end'] = reindeer['max_end'] - 1;
                reindeer['current_rest'] = reindeer['max_rest'];
                reindeer['distance'] += reindeer['speed'];
            }
        });
    }

    let max = 0;
    reindeers.forEach(function(reindeer) {
        if (reindeer['distance'] > max) max = reindeer['distance'];
    });

    return max;
}

function add_points(reindeers) {
    let leaders = [];
    let max = 0;
    reindeers.forEach(function(reindeer) {
        if (reindeer['distance'] > max) {
            max = reindeer['distance'];
        }
    });

    reindeers.forEach(function(reindeer) {
        if (reindeer['distance'] == max) leaders.push(reindeer)
    });

    leaders.forEach(reindeer => reindeer['points']++);

    return reindeers;
}

function race_with_points(reindeers, race_end) {
    for (let i = 0; i < race_end; i++) {
        reindeers.forEach(function(reindeer) {
            if (reindeer['current_end'] > 0) {
                reindeer['current_end']--;
                reindeer['distance'] += reindeer['speed'];
            } else if (reindeer['current_rest'] > 0) reindeer['current_rest']--;
            else {
                reindeer['current_end'] = reindeer['max_end'] - 1;
                reindeer['current_rest'] = reindeer['max_rest'];
                reindeer['distance'] += reindeer['speed'];
            }
        });
        add_points(reindeers);
    }

    let max = 0;
    reindeers.forEach(function(reindeer) {
        if (reindeer['points'] > max) max = reindeer['points'];
    });

    return max;
}

let reindeers = []
puzzle_input.forEach(function(reindeer_description) {
    let [_, name, speed, endurance, rest] = reindeer_description.match(/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
    new_reindeer = { 'name': name, 'speed': +speed, 'max_end': +endurance, 'current_end': +endurance, 'max_rest': +rest, 'current_rest': +rest, 'distance': 0, 'points': 0 };
    reindeers.push(new_reindeer);
});

console.log('Part 1:', race(reindeers, 2503));
reset_reindeers(reindeers)
console.log('Part 2:', race_with_points(reindeers, 2503));