const { Server } = require('http');
const { rebind } = require('./utils');
const { Presentation } = require('./presentation');

/**
 * @typedef I_Display
 * @type {InstanceType<import('./display')['Display']>}
 */

 /**
 * @typedef I_AnyLayer
 * @type {import('./layer').AnyLayer}
 */

 /**
 * @typedef I_PresentationContent
 * @type {import('./presentation').PresentationContent}
 */

 /**
 * @typedef I_Asset
 * @type {InstanceType<import('./asset')['Asset']>}
 */


/**
 * @param {Set<I_PresentationContent>} items
 * @param {'layers'|'preload'} itemsProp
 * @param {Set<I_AnyLayer>} collection
 * @returns {Set<I_AnyLayer>}
 */
function getPresentationLayers(
  items,
  itemsProp,
  collection = /** @type {Set<I_AnyLayer>} */ (new Set())
) {
  items.forEach((item) => {
    if (item instanceof Presentation) {
      getPresentationLayers(item[itemsProp], itemsProp, collection);

      return;
    }

    collection.add(item);
  });

  return collection;
}

class DisplayServerDisplay {

  /**
   * @param {I_Display} display
   */
  constructor(display) {
    this.display = display;
    this.connection = /** @type {import('http').ServerResponse['write']|null} */ (null);

    this.display.setChangeCallback(() => {
      this._publishMessage(this._data, 'update');
    });

    setInterval(() => {
      this._publishMessage(null, 'keepalive');
    }, 10000);
  }

  get _data() {
    const presentations = this.display.presentations;

    const layers = getPresentationLayers(presentations, 'layers');
    const preload = getPresentationLayers(presentations, 'preload');

    const assets = /** @type {Set<I_Asset>} */ (new Set());

    layers.forEach(
      ({ assets: layerAssets }) => layerAssets.forEach(
        (layerAsset) => assets.add(layerAsset)
      )
    );

    preload.forEach(
      ({ assets: layerAssets }) => layerAssets.forEach(
        (layerAsset) => assets.add(layerAsset)
      )
    );

    return {
      assets: [...assets].map((asset) => ({
        hash: asset.hash,
        id: asset.id,
        MIMEType: asset.MIMEType,
        type: asset.type,
        url: asset.url.toString()
      })),
      layers: [...layers].map((layer) => ({
        assets: [...layer.assets].map((asset) => asset.id),
        id: layer.id,
        state: layer.state,
        type: layer.type.description
      }))
    };
  }

  get id() {
    return this.display.id;
  }

  /**
   * @param {any} data
   * @param {string} type
   * @returns {boolean}
   */
  _publishMessage(data, type) {
    if (!this.connection) return false;

    let payload = '';

    try {
      payload = JSON.stringify(
        {
          type,
          data
        },
        null,
        null
      );
    } catch (_) {
      return false;
    }

    try {
      this.connection(Buffer.from(`data: ${payload}\n\n`));
    } catch (_) {
      return false;
    }

    return true;
  }

  /**
   * @param {import('http').ServerResponse['write']} writer
   */
  connect(writer) {
    if (this.connection) return;
    this.connection = writer;

    this.display.onChange();
  }

  destroy() {
    this.disconnect();
    this.display.removeChangeCallback();
  }

  disconnect() {
    this.connection = null;
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

    if (display.connection) {
      const message = 'display name already in use';
      response.writeHead(503, message);
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
    display.connect(response.write);
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
