export default function omitPasswordOnResponse(userData) {
    const { password, ...rest } = userData;
    return rest;
}