const path = require('path');
const fs = require('fs');

const puzzle_input = fs.readFileSync(path.join(__dirname, '/puzzle_input/input9.txt'), 'utf8').toString().split(/\r|\n|\r\n/).filter(item => item);

function push2dict(dict, key, value) {
    if (dict.hasOwnProperty(key)) dict[key].push(value)
    else dict[key] = [value]
}

function build_tree(puzzle_input) {
    let nodes = new Set();
    let graph = {};
    puzzle_input.forEach(function extract_nodes(elem) {
        let [new_pair, distance] = elem.split(' = ');
        new_pair = new_pair.split(' to ');
        new_pair.forEach(node => nodes.add(node));

        push2dict(graph, new_pair[0], [new_pair[1], +distance]);
        push2dict(graph, new_pair[1], [new_pair[0], +distance]);
    });

    return [nodes, graph]
}

function get_all_distances(graph, nodes) {
    let distances = new Set();
    nodes.forEach(function(node) {
        let queue = [
            [node, [], 0]
        ];
        while (queue.length) {
            let [current_node, visited, distance] = queue.shift();
            visited.push(current_node);
            graph[current_node].forEach(function(neighbour) {
                if (!visited.includes(neighbour[0])) {
                    queue.push([neighbour[0], visited.slice(0), distance + neighbour[1]]);
                } else if (visited.length >= nodes.size) distances.add(distance)
            });
        }
    })

    return distances;
}

var [nodes, graph] = build_tree(puzzle_input);

console.log('Part 1:', Math.min(...get_all_distances(graph, nodes)));
console.log('Part 2:', Math.max(...get_all_distances(graph, nodes)));