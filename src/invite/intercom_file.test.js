const path = require('path')

const { assert } = require('chai')

const {
    parse,
    FileUnreadableError,
    LineUnreadableError,
} = require('./intercom_file')

describe('intercom_file', function() {
    describe('#parse', function() {
        it('parses valid input to an array of objects', function() {
            return parse(
                path.join(__dirname, './fixtures/valid.txt')
            ).then(customers => {
                assert.deepEqual(customers, [{ foo: 'bar' }, { baz: 'bla' }])
            })
        })

        it("throws when it can't read filename", function() {
            return parse(
                path.join(__dirname, './fixtures/inexistant.txt')
            ).then(
                () => {
                    throw new Error('Promise should not fulfill')
                },
                e => {
                    assert.instanceOf(e, FileUnreadableError)
                }
            )
        })

        it("throws when it can't parse a line", function() {
            return parse(path.join(__dirname, './fixtures/invalid.txt')).then(
                () => {
                    throw new Error('Promise should not fulfill')
                },
                e => {
                    assert.instanceOf(e, LineUnreadableError)
                }
            )
        })
    })
})
