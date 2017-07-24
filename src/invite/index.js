const AVG_EARTH_RADIUS_KM = 6371

function choose_customers_close_to(customers, location, distance = 100) {
    return customers
        .filter(user => compute_distance_between(user, location) < distance)
        .sort((a, b) => a.user_id - b.user_id)
}

/**
 * Computes the distance between two points on Earth
 * @see https://en.wikipedia.org/wiki/Great-circle_distance#Formulas
 */
function compute_distance_between(a, b) {
    const [ɸa, ɸb, ƛa, ƛb] = [
        a.latitude,
        b.latitude,
        a.longitude,
        b.longitude,
    ].map(degrees_to_radians)

    const central_angle = Math.acos(
        Math.sin(ɸa) * Math.sin(ɸb) +
            Math.cos(ɸa) * Math.cos(ɸb) * Math.cos(ƛa - ƛb)
    )

    const distance = AVG_EARTH_RADIUS_KM * central_angle
    return distance
}

function degrees_to_radians(degrees) {
    return degrees * Math.PI / 180
}

exports.choose_customers_close_to = choose_customers_close_to
exports.compute_distance_between = compute_distance_between
