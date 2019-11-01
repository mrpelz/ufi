const EventEmitter = require('events');
const { changeEvent: layerChangeEvent } = require('./layer');
const { rebind, uuid } = require('./utils');

/**
 * @typedef I_Layer
 * @type {InstanceType<import('./layer')['Layer']>}
 */

 /**
 * @typedef I_AnySlide
 * @type {import('./slide').AnySlide}
 */

const changeEvent = Symbol('change');

/**
 * @class Presentation
 */
class Presentation extends EventEmitter {
  constructor() {
    super();

    this.id = uuid();

    this.layers = /** @type {Set<I_Layer>} */ (new Set());
    this.slides = /** @type {Set<I_AnySlide>} */ (new Set());

    rebind(this, '_onChange');
  }

  _onChange() {
    this.emit(changeEvent);
  }

  /**
   * @param {I_AnySlide} slide
   */
  loadSlide(slide) {
    this.slides.add(slide);

    this._onChange();
  }

  /**
   * @param {I_AnySlide} slide
   */
  unloadSlide(slide) {
    this.slides.delete(slide);

    this._onChange();
  }

  /**
   * @param {I_Layer[]} layers
   */
  setLayers(layers) {
    [...this.layers].forEach((layer) => {
      layer.removeListener(layerChangeEvent, this._onChange);
    });

    this.layers.clear();

    layers.forEach((layer) => {
      this.layers.add(layer);
      layer.on(layerChangeEvent, this._onChange);
    });

    this._onChange();
  }
}

module.exports = {
  changeEvent,
  Presentation
};
