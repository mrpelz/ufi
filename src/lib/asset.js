const { uuid } = require('./utils');

/**
 * @class Asset
 */
class Asset {

  /**
   * @param {string|URL} url
   * @param {{
   *  type?: PreloadType,
   *  MIMEType?: PreloadMIMEType,
   *  hash?: string
   * }} options
   */
  constructor(url, options = {}) {
    const {
      type = 'document',
      MIMEType,
      hash
    } = options;

    this.id = uuid();
    this.hash = hash;
    this.MIMEType = MIMEType;
    this.url = url instanceof URL ? url : new URL(url);
    this.type = type;
  }
}

module.exports = {
  Asset
};
