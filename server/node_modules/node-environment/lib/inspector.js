const compare = require('./compare-aliases')
const modes = require('./modes.enum')

/**
 * Given an env value, checks whether NODE_ENV correspond to that value
 *
 * Inspector has two modes of operation, with a given argument or not. Given a
 * argument, the value is compared to a known environment values (dev, prod,...)
 * then a exact insensitive case match is made with the value. If there's no
 * given value, then compare the raw value of NODE_ENV is returned
 *
 * @example <caption>with NODE_ENV="dev"</caption>
 * 	  inspector() // "dev"
 * 	  inspector("test") // false
 * 	  inspector("development") // true
 * 	  inspector("staging", "production") // false
 * 	  inspector("dev") // true
 *
 * @param {string[] | undefined} [envs] environment to be tested
 * @return {boolean | string}
 */
function inspector(...envs) {
  const nodeEnv = process.env.NODE_ENV ?? 'development'

  if (envs.length === 0) {
    return nodeEnv
  }

  return envs.reduce((prev, env) => {
    if (isKnownMode(env, nodeEnv)) {
      return true
    }

    return prev || compare(env, nodeEnv)
  }, false)
}

/**
 * Compare for a known env mode
 * @param {string} env
 * @param {string} nodeEnv
 * @return {boolean}
 */
function isKnownMode(env, nodeEnv) {
  for (const mode of Object.values(modes)) {
    if (compareKnownMode(env, nodeEnv, Object.values(mode))) {
      return true
    }
  }

  return false
}

/**
 *
 * @param {string} env
 * @param {string} nodeEnv
 * @param {string[]} possibleValues
 * @return {boolean}
 */
function compareKnownMode(env, nodeEnv, possibleValues) {
  return compare(env, ...possibleValues) && compare(nodeEnv, ...possibleValues)
}

module.exports = inspector
