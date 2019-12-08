const { deserialize, serialize } = require('v8');

function isObject(input) {
  return input instanceof Object
    && !(input instanceof Function);
}

/**
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
function deepMerge(target, source) {
  if (!isObject(target)) return source;
  if (!isObject(source)) return source;

  if (Array.isArray(source)) {
    if (!Array.isArray(target)) return source;

    source.forEach((sourceValue, index) => {
      const { [index]: targetValue } = target;

      target[index] = deepMerge(targetValue, sourceValue);
    });

    return target;
  }

  Object.keys(source).forEach((prop) => {
    const { [prop]: targetValue } = target;
    const { [prop]: sourceValue } = source;

    target[prop] = deepMerge(targetValue, sourceValue);
  });

  return target;
}

const logLevels = {
  'EMERG': 0,
  'ALERT': 1,
  'CRITICAL': 2,
  'ERROR': 3,
  'WARNING': 4,
  'NOTICE': 5,
  'INFO': 6,
  'DEBUG': 7,
};

/**
 *
 * @param {string} level
 * @param {string} message
 */
function log(level, message) {
  // eslint-disable-next-line no-console
  console.log(`<${logLevels[level]}>${message}`);
}

/**
 * rebind class methods
 * @param {any} context class context (this)
 * @param  {...string} names method names
 */
function rebind(context, ...names) {
  names.forEach((name) => {
    context[name] = context[name].bind(context);
  });
}

/**
 * @param {any} value
 */
function structuredClone(value) {
  return deserialize(serialize(value));
}

/* eslint-disable */
/**
 *
 * @param {unknown} a
 * @returns {string}
 */
// @ts-ignore-line
function uuid(a = undefined){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}
/* eslint-enable */

module.exports = {
  deepMerge,
  log,
  logLevels,
  rebind,
  structuredClone,
  uuid
};
