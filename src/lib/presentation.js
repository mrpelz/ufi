const EventEmitter = require('events');
const { changeEvent: layerChangeEvent } = require('./layer');
const { rebind, uuid } = require('./utils');

/**
 * @typedef I_AnyLayer
 * @type {import('./layer').AnyLayer}
 */

/**
 * @typedef PresentationContent
 * @type {I_AnyLayer|Presentation}
 */

const changeEvent = Symbol('change');

/**
 * @class Presentation
 */
class Presentation extends EventEmitter {
  constructor() {
    super();

    this.id = uuid();
    this.layers = /** @type {Set<PresentationContent>} */ (new Set());
    this.preload = /** @type {Set<PresentationContent>} */ (new Set());

    rebind(this, '_onChange');
  }

  _onChange() {
    this.emit(changeEvent);
  }

  /**
   * @param {PresentationContent} layer
   */
  preloadLayer(layer) {
    this.preload.add(layer);

    this._onChange();
  }

  /**
   * @param {PresentationContent} layer
   */
  unloadLayer(layer) {
    if (this.preload.has(layer)) {
      this.preload.delete(layer);

      this._onChange();
    }
  }

  /**
   * @param {PresentationContent[]} layers
   */
  setLayers(layers) {
    [...this.layers].forEach((layer) => {
      const eventIdentifier = layer instanceof Presentation
        ? changeEvent
        : layerChangeEvent;

        layer.removeListener(eventIdentifier, this._onChange);
    });

    this.layers.clear();

    layers.forEach((layer) => {
      this.layers.add(layer);

      const eventIdentifier = layer instanceof Presentation
        ? changeEvent
        : layerChangeEvent;

      layer.on(eventIdentifier, this._onChange);
    });

    this._onChange();
  }
}

module.exports = {
  changeEvent,
  Presentation
};
