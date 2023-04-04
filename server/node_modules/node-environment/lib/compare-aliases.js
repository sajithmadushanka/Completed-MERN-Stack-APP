/**
 * Compare a list of case insensitive aliases for a given environment value
 *
 * @param {string} env value to be test
 * @param {string[]} aliases aliases to be compared to
 * @return {boolean}
 */
module.exports = function compareAliases(env, ...aliases) {
  return aliases.some((alias) => alias.toLowerCase() === env.toLowerCase())
}
