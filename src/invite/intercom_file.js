const fs = require('fs')
const readline = require('readline')

class FileUnreadableError extends Error {}
class LineUnreadableError extends Error {}

/**
 * Parses a file with one JSON-encoded record per line
 */
function parse(filepath) {
    return new Promise((resolve, reject) => {
        const read_stream = fs.createReadStream(filepath)

        read_stream.on('error', e => {
            reject(new FileUnreadableError(`We can't read ${filepath}`))
        })

        read_stream.on('readable', () => {
            const rl = readline.createInterface({ input: read_stream })
            const customers = []

            rl.on('line', line => {
                try {
                    customers.push(JSON.parse(line))
                } catch (e) {
                    reject(
                        new LineUnreadableError(
                            `We couldn't parse this line as JSON:\n${line}`
                        )
                    )
                }
            })

            rl.on('close', () => {
                resolve(customers)
            })
        })
    })
}

exports.parse = parse
exports.FileUnreadableError = FileUnreadableError
exports.LineUnreadableError = LineUnreadableError
