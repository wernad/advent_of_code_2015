var puzzle_input = 'hxbxwxba';

function group_by_count(string) {
    let groups = [];
    let last_char = string[0];
    let count = 1;

    for (i = 1; i < string.length; i++) {
        var c = string.charAt(i)
        if (last_char == c) count++;
        else {
            groups.push(count);
            last_char = c;
            count = 1;
        }
    }
    groups.push(count);

    return groups
}

function increment_string(string) {
    for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] == 'z') {
            string = [...string];
            string[i] = 'a';
            string = string.join('');
        } else {
            string = [...string];
            string[i] = String.fromCharCode(string[i].charCodeAt(0) + 1);
            string = string.join('');
            break;
        }
    }
    return string;
}

function find_password(old_pass) {
    while (old_pass = increment_string(old_pass)) {
        if (old_pass[0] == 'z') return

        if (old_pass.match(/i|o|l/g)) continue

        let counts = group_by_count(old_pass);

        let pairs = [];

        counts.forEach(function(x) { if (x == 2) pairs.push(x) });
        if (pairs.length < 2) continue

        var triplet_found = false;
        for (var i = 0; i < old_pass.length - 2; i++) {
            if (old_pass[i].charCodeAt(0) + 1 == old_pass[i + 1].charCodeAt(0) && old_pass[i].charCodeAt(0) + 2 == old_pass[i + 2].charCodeAt(0)) {
                triplet_found = true;
                break;
            }
        }

        if (triplet_found) return old_pass;
    }
}

puzzle_input = find_password(puzzle_input)
console.log('Part 1:', puzzle_input);
console.log('Part 2:', find_password(puzzle_input));