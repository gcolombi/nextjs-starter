/**
 * Generates a random number using a minimum and maximum value
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @returns {Number} a random number
 */
export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (1 + max - min) + min);
}