const { uuid } = require('./utils');

/**
 * @typedef I_Asset
 * @type {InstanceType<import('./asset.js')['Asset']>}
 */

/**
 * @typedef AnySlide
 * @type {HTMLSlide | ImageSlide | VideoSlide}
 */

const types = {
  html: Symbol('html'),
  image: Symbol('image'),
  video: Symbol('video')
};

/**
 * @class Slide
 */
class Slide {

  /**
   * @param  {symbol|null} type
   * @param  {...I_Asset} assets
   */
  constructor(type, ...assets) {
    this.id = uuid();

    this.assets = new Set(assets);
    this.type = type;
  }
}

/**
 * @class HTMLSlide
 */
class HTMLSlide extends Slide {

  /**
   * @param  {...I_Asset} assets
   */
  constructor(...assets) {
    super(types.html, ...assets);
  }
}

/**
 * @class ImageSlide
 */
class ImageSlide extends Slide {

  /**
   * @param  {I_Asset} asset
   */
  constructor(asset) {
    super(types.image, asset);
  }
}

/**
 * @class ImageSlide
 */
class VideoSlide extends Slide {

  /**
   * @param  {I_Asset} asset
   */
  constructor(asset) {
    super(types.video, asset);
  }
}

module.exports = {
  HTMLSlide,
  ImageSlide,
  VideoSlide
};
