const puzzle_input = '1113222113';

function groupBy(string) {
    let groups = [];
    let last_char = string[0];
    let count = 1;

    for (i = 1; i < string.length; i++) {
        var c = string.charAt(i)
        if (last_char == c) count++;
        else {
            groups.push([count, last_char]);
            last_char = c;
            count = 1;
            if (i + 1 == string.length) groups.push([count, last_char]);
        }

    }
    return groups
}

function look_and_say(string) {
    let new_string = '';
    groupBy(string).forEach(char => new_string += char);
    return new_string.replace(/,/g, '');
}

var output = puzzle_input.slice(0);

for (let i = 0; i < 50; i++) {
    output = look_and_say(output);
    if (i == 39) console.log('Part 1:', output.length);
}

console.log('Part 2:', output.length);