class InvalidArgument extends Error {}

function flatten(input) {
    if (!Array.isArray(input)) {
        throw new InvalidArgument()
    }

    return input.reduce((accumulator, current) => {
        if (Array.isArray(current)) {
            return accumulator.concat(flatten(current))
        } else {
            return accumulator.concat(current)
        }
    }, [])
}

exports.InvalidArgument = InvalidArgument
exports.flatten = flatten
