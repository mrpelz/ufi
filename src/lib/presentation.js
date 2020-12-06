const { EventEmitter } = require('events');
const { uuid } = require('./utils');

/**
 * @typedef I_AnyLayer
 * @type {import('./layer').AnyLayer}
 */

/**
 * @typedef PresentationContent
 * @type {I_AnyLayer|Presentation}
 */

/**
 * @class Presentation
 */
class Presentation extends EventEmitter {
  constructor() {
    super();

    this.id = uuid();
    this.layers = /** @type {Set<PresentationContent>} */ (new Set());
    this.preload = /** @type {Set<PresentationContent>} */ (new Set());
  }

  /**
   * @param {PresentationContent} layer
   */
  preloadLayer(layer) {
    this.preload.add(layer);
  }

  /**
   * @param {PresentationContent} layer
   */
  unloadLayer(layer) {
    if (this.preload.has(layer)) {
      this.preload.delete(layer);
    }
  }

  /**
   * @param {PresentationContent[]} layers
   */
  setLayers(layers) {
    this.layers.clear();

    layers.forEach((layer) => {
      this.layers.add(layer);
    });
  }
}

module.exports = {
  Presentation
};
