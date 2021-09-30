const { uuid } = require('./utils');

/**
 * @class Asset
 */
class Asset {

  /**
   * @param {string} url
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
    this.url = url;
    this.type = type;
  }
}

module.exports = {
  Asset
};
