const { Server } = require('http');
const { rebind } = require('./utils');

/**
 * @typedef I_Display
 * @type {InstanceType<import('./display')['Display']>}
 */

 /**
 * @typedef I_Layer
 * @type {InstanceType<import('./layer')['Layer']>}
 */

 /**
 * @typedef I_AnySlide
 * @type {import('./slide').AnySlide}
 */

 /**
 * @typedef I_Asset
 * @type {InstanceType<import('./asset')['Asset']>}
 */

class DisplayServerDisplay {

  /**
   * @param {I_Display} display
   */
  constructor(display) {
    this._display = display;
    this._connection = /** @type {import('http').ServerResponse['write']|null} */ (null);

    rebind(this, '_publishMessage');

    this._display.setChangeCallback(this._publishMessage);
  }

  get _data() {
    const presentations = [...this._display.presentations];

    const layers = /** @type {I_Layer[]} */ [...new Set(([]).concat(
      ...presentations.map(({ layers: l }) => [...l])
    ))];

    const slides = /** @type {I_AnySlide[]} */ [...new Set(([]).concat(
      ...layers.map(({ slide: s }) => s),
      ...presentations.map(
        (presentation) => /** @type {I_AnySlide[]} */ ([]).concat(
          ...presentation.slides
        )
      )
    ))];

    const assets = /** @type {I_Asset[]} */ [...new Set(([]).concat(
      ...slides.map((slide) => [...slide.assets])
    ))];

    return {
      assets: assets.map((asset) => ({
        id: asset.id,
        hash: asset.hash,
        MIMEType: asset.MIMEType,
        url: asset.url.toString(),
        type: asset.type
      })),
      slides: slides.map((slide) => ({
        assets: [...slide.assets].map((asset) => asset.id),
        id: slide.id,
        type: slide.type.description
      })),
      layers: layers.map((layer) => ({
        classNames: layer.classList.toString(),
        id: layer.id,
        slide: layer.slide.id,
        state: layer.state
      }))
    };
  }

  get id() {
    return this._display.id;
  }

  /**
    * @returns {boolean}
    */
  _publishMessage() {
    if (!this._connection) return false;

    const data = this._data;

    let payload = '';

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 2));

    try {
      payload = JSON.stringify(data, null, null);
    } catch (_) {
      return false;
    }

    try {
      this._connection(Buffer.from(`data: ${payload}\n\n`));
    } catch (_) {
      return false;
    }

    return true;
  }

  /**
   * @param {import('http').ServerResponse['write']} writer
   */
  connect(writer) {
    if (this._connection) throw new Error('display already has a connected stream');
    this._connection = writer;

    this._display.onChange();
  }

  destroy() {
    this._display.removeChangeCallback();
  }

  disconnect() {
    this._connection = null;
  }
}

/**
 * @class DisplayServer
 */
class DisplayServer {

  /**
   * @param {{
   *  host?: string,
   *  port: (number|null)
   * }} options
   */
  constructor({
    host = '127.0.0.1',
    port = null
  }) {
    if (!host || !port) {
      throw new Error('insufficient options provided');
    }

    this._state = {
      displays: /** @type {Set<DisplayServerDisplay>} */ (new Set()),
      host,
      port,
      server: /** @type {import('http').Server} */ (new Server())
    };

    rebind(this, '_handleRequest');

    this._state.server.on('request', this._handleRequest);
  }

  /**
   * @param {string} id
   * @returns {DisplayServerDisplay|undefined}
   */
  _getDisplayByName(id) {
    return [...this._state.displays.values()].find((displayServerDisplay) => {
      return displayServerDisplay.id === id;
    });
  }

  /**
   * @param {import('http').IncomingMessage} request
   * @param {import('http').ServerResponse} response
   */
  _handleRequest(request, response) {
    const {
      host,
      port
    } = this._state;

    rebind(response, 'write');

    if (request.method !== 'GET') {
      response.writeHead(405);
      response.end();
    }

    const httpHost = request.headers.host;
    const baseUrl = httpHost || `${host}:${port}`;

    const url = new URL(request.url, `http://${baseUrl}/`);
    const name = url.searchParams.get('name');

    if (!name) {
      const message = 'please provide display name as query-string item "name"';
      response.writeHead(400, message);
      response.end(message);

      return;
    }

    const display = this._getDisplayByName(name);

    if (!display) {
      const message = 'display name not found';
      response.writeHead(404, message);
      response.end(`${message} [${name}]`);

      return;
    }

    response.once('close', () => {
      display.disconnect();
    });

    response.writeHead(200, 'success', {
      'Content-Type': 'text/event-stream; charset=utf-8'
    });

    response.write(Buffer.from(`: welcome to the event stream\n: client "${name}"\n\n`));

    try {
      display.connect(response.write);
    } catch (_) {
      const message = 'display name already iin use';
      response.writeHead(503, message);
      response.end(`${message} [${name}]`);
    }
  }

  /**
   * @param {I_Display} display
   */
  addDisplay(display) {
    if (this._getDisplayByName(display.id)) throw new Error('display name in use');

    const displayServerDisplay = new DisplayServerDisplay(display);
    this._state.displays.add(displayServerDisplay);

    return displayServerDisplay;
  }

  close() {
    const { server } = this._state;
    server.close();
  }

  listen() {
    const { host, port, server } = this._state;
    server.listen(port, host);
  }

  /**
   * @param {DisplayServerDisplay} displayServerDisplay
   */
  removeDisplay(displayServerDisplay) {
    displayServerDisplay.destroy();
    this._state.displays.delete(displayServerDisplay);
  }
}

module.exports = {
  DisplayServer
};
