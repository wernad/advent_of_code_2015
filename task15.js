const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input15.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

var ingredients = {}
puzzle_input.forEach(function(recipe_line) {
    [_, ingredient, capacity, durability, flavor, texture, calories] = recipe_line.match(/(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
    ingredients[ingredient] = [+capacity, +durability, +flavor, +texture, +calories];
});

function create_recipe_solver(calories_limit = 0) {
    let max = 0;
    for (let i = 0; i < 101; i++) {
        for (let j = 0; j < 101; j++) {
            for (let k = 0; k < 101; k++) {
                for (let l = 0; l < 101; l++) {
                    if ((i + j + k + l) == 100) {
                        let sums = []
                        sums.push(ingredients['Sugar'][0] * i + ingredients['Sprinkles'][0] * j + ingredients['Candy'][0] * k + ingredients['Chocolate'][0] * l);
                        sums.push(ingredients['Sugar'][1] * i + ingredients['Sprinkles'][1] * j + ingredients['Candy'][1] * k + ingredients['Chocolate'][1] * l);
                        sums.push(ingredients['Sugar'][2] * i + ingredients['Sprinkles'][2] * j + ingredients['Candy'][2] * k + ingredients['Chocolate'][2] * l);
                        sums.push(ingredients['Sugar'][3] * i + ingredients['Sprinkles'][3] * j + ingredients['Candy'][3] * k + ingredients['Chocolate'][3] * l);
                        sums.push(ingredients['Sugar'][4] * i + ingredients['Sprinkles'][4] * j + ingredients['Candy'][4] * k + ingredients['Chocolate'][4] * l);

                        let flag = true;
                        sums.forEach(function(x) {
                            if (x <= 0) flag = false
                            if (sums[4] != calories_limit && calories_limit != 0) flag = false
                        })
                        if (flag) {
                            sums[4] = 1
                            let total = sums.reduce((a, b) => a * b, 1);
                            if (total > max) max = total;
                        }
                    }
                }
            }

        }
    }

    return max;
}

console.log('Part 1:', create_recipe_solver());
console.log('Part 2:', create_recipe_solver(500));