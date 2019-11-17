const { uuid } = require('./utils');

/**
 * @typedef I_Asset
 * @type {InstanceType<import('./asset.js')['Asset']>}
 */

 /**
 * @typedef AnySlide
 * @type {InstanceType<typeof slides.HTMLSlide>
 * | InstanceType<typeof slides.ImageSlide>
 * | InstanceType<typeof slides.ReactSlide>
 * | InstanceType<typeof slides.VideoSlide>}
 */

/**
 * @class Slide
 */
class Slide {

  /**
   * @param  {symbol} type
   * @param  {...I_Asset} assets
   */
  constructor(type, ...assets) {
    this.id = uuid();
    this.assets = new Set(assets);
    this.type = type;
  }
}

/**
 * @param {symbol} type
 */
const extendSlide = (type) => (

  /**
   * @returns {Slide}
   */
  class extends Slide {

    /**
     * @param  {...I_Asset} assets
     */
    constructor(...assets) {
      super(type, ...assets);
    }
  }
);

const slides = {
  HTMLSlide: extendSlide(Symbol('html')),
  ImageSlide: extendSlide(Symbol('image')),
  ReactSlide: extendSlide(Symbol('react')),
  VideoSlide: extendSlide(Symbol('video'))
};

module.exports = {
  ...slides
};
