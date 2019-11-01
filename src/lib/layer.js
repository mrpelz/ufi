const EventEmitter = require('events');
const { deepMerge, uuid } = require('./utils');

/**
 * @typedef I_AnySlide
 * @type {import('./slide.js').AnySlide}
 */

const changeEvent = Symbol('change');

class ClassList extends EventEmitter {
  constructor() {
    super();

    this._classes = /** @type {Set<string>} */ (new Set());
  }

  /**
   * @param  {...string} items
   */
  add(...items) {
    items.forEach((item) => {
      this._classes.add(item);
    });

    this.emit(changeEvent);
  }

  /**
   * @param {string} item
   * @returns {boolean}
   */
  contains(item) {
    return this._classes.has(item);
  }

  /**
   * @param  {number} index
   * @returns {string}
   */
  item(index) {
    return this._classes[index];
  }

  /**
   * @param  {...string} items
   */
  remove(...items) {
    items.forEach((item) => {
      this._classes.delete(item);
    });

    this.emit(changeEvent);
  }

  /**
   * @param {string} oldItem
   * @param {string} newItem
   */
  replace(oldItem, newItem) {
    this._classes.delete(oldItem);
    this._classes.add(newItem);

    this.emit(changeEvent);
  }

  /**
   * @param {string} item
   * @param {boolean|null} force
   */
  toggle(item, force = null) {
    if (force === null) {
      if (this.contains(item)) {
        this.remove(item);

        return;
      }

      this.add(item);

      return;
    }

    if (!force) {
      this.remove(item);

      return;
    }

    this.add(item);
  }

  /**
   * @returns {string}
   */
  toString() {
    return [...this._classes].join(' ');
  }
}

/**
 * @class Layer
 */
class Layer extends EventEmitter {

  /**
   * @param {I_AnySlide} slide
   */
  constructor(slide) {
    super();

    this.id = uuid();
    this.classList = new ClassList();
    this.state = /** @type {Object} */ ({});
    this.slide = slide;

    this.classList.on(changeEvent, () => this.emit(changeEvent));
  }

  /**
   * @param {Object} data
   */
  setData(data) {
    deepMerge(this.state, data);
    this.emit(changeEvent);
  }
}

module.exports = {
  changeEvent,
  Layer
};
