const crypto = require('crypto');

var puzzle_input = 'yzbqklnj';

function get_postfix(length, puzzle_input) {
    let postfix = 0;
    while (true) {
        //Have to create new hash everytime because digest() method makes it unusable.
        let md5 = crypto.createHash('md5');
        md5.update(puzzle_input + postfix);
        if (md5.digest('hex').slice(0, length) == '0'.repeat(length)) {
            break;
        }
        postfix++;
    }
    return postfix;
}

console.log('Part 1:', get_postfix(5, puzzle_input));
console.log('Part 2:', get_postfix(6, puzzle_input));