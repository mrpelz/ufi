const { EventEmitter } = require('events');
const { deepMerge, structuredClone, uuid } = require('./utils');

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

const initialState = /** @type {LayerState} */ ({
  layout: {
    alignX: 'center',
    alignY: 'center',
    spanColumns: 10,
    spanRows: 10
  }
});

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
    this.state = /** @type {LayerState} */ (structuredClone(initialState));
    this.type = type;
  }

  /**
   * @param {LayerState} data
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
