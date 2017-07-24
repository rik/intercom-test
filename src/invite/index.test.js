const { assert } = require('chai')

const {
    compute_distance_between,
    choose_customers_close_to,
} = require('./index')

const tests = [
    { user_id: 12, latitude: 52.986375, longitude: -6.043701, distance: 41.8 },
    { user_id: 1, latitude: 51.92893, longitude: -10.27699, distance: 314.1 },
    {
        user_id: 2,
        latitude: 51.8856167,
        longitude: -10.4240951,
        distance: 325.2,
    },
    {
        user_id: 3,
        latitude: 52.3191841,
        longitude: -8.5072391,
        distance: 189.4,
    },
    { user_id: 28, latitude: 53.807778, longitude: -7.714444, distance: 109.7 },
    { user_id: 7, latitude: 53.4692815, longitude: -9.436036, distance: 211.9 },
    { user_id: 8, latitude: 54.0894797, longitude: -6.18671, distance: 83.63 },
]

const dublin_office = { latitude: 53.3393, longitude: -6.2576841 }

describe('#compute_distance_between', function() {
    for (const location of tests) {
        it(`${location.latitude} ${location.longitude} is at ${location.distance} of Dublin office`, function() {
            assert.closeTo(
                compute_distance_between(dublin_office, {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }),
                location.distance,
                1
            )
        })
    }
})

describe('#choose_customers_close_to', function() {
    it('chooses customers and orders by user_id', function() {
        const customers = choose_customers_close_to(tests, dublin_office)

        assert.deepEqual(customers.map(x => x.user_id), [8, 12])
    })
})
