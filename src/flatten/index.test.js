const { flatten, InvalidArgument } = require('./index')
const { assert } = require('chai')

describe('#flatten', function() {
    describe('Valid inputs', function() {
        const tests = [
            { input: [1, [2, 3]], expected: [1, 2, 3] },
            { input: [1, undefined, 3], expected: [1, undefined, 3] },
            { input: [[[[[[[[[[1]]]]]]], 2], 3], 4], expected: [1, 2, 3, 4] },
        ]
        for (let { input, expected } of tests) {
            it(JSON.stringify(input), function() {
                assert.deepEqual(flatten(input), expected)
            })
        }
    })

    describe('Invalid inputs', function() {
        const tests = [1, 'string', { length: 10 }]
        for (let input of tests) {
            it(JSON.stringify(input), function() {
                assert.throws(() => flatten(input), InvalidArgument)
            })
        }
    })
})
