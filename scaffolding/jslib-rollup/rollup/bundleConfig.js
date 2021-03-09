/**
 * export a function generating the custom configure object or export the custom configure object directly
 * the members of the custom configure as follow:
 * {
 *      entries: String || Array, // the input sources
 *      defaultConfigs: {
 *          // see the rollup document
 *      }
 * }
 * @returns 
 */

module.exports = function () {
    return {
        entries: "./src/index.js"
    }
}
