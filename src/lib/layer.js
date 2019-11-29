const EventEmitter = require('events');
const { deepMerge, uuid } = require('./utils');

/**
 * @typedef I_Asset
 * @type {InstanceType<import('./asset.js')['Asset']>}
 */

 /**
 * @typedef AnyLayer
 * @type {InstanceType<typeof layers.HTMLLayer>
 * | InstanceType<typeof layers.ImageLayer>
 * | InstanceType<typeof layers.ModuleLayer>
 * | InstanceType<typeof layers.VideoLayer>}
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
      item.split(' ').forEach((className) => {
        this._classes.add(className);
      });
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
      item.split(' ').forEach((className) => {
        this._classes.delete(className);
      });
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
   * @param  {symbol} type
   * @param  {...I_Asset} assets
   */
  constructor(type, ...assets) {
    super();

    this.id = uuid();
    this.assets = new Set(assets);
    this.classList = new ClassList();
    this.state = /** @type {Object} */ ({});
    this.type = type;

    this.classList.on(changeEvent, () => this.emit(changeEvent));
  }

  /**
   * @param {Object} data
   */
  setState(data) {
    deepMerge(this.state, data);
    this.emit(changeEvent);
  }
}

/**
 * @param {symbol} type
 */
const extendLayer = (type) => (

  /**
   * @returns {Layer}
   */
  class extends Layer {

    /**
     * @param  {...I_Asset} assets
     */
    constructor(...assets) {
      super(type, ...assets);
    }
  }
);

const layers = {
  HTMLLayer: extendLayer(Symbol('html')),
  ImageLayer: extendLayer(Symbol('image')),
  ModuleLayer: extendLayer(Symbol('module')),
  VideoLayer: extendLayer(Symbol('video'))
};

module.exports = {
  changeEvent,
  ...layers
};
