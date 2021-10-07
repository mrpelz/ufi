const { Server } = require('http');

const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ImageLayer, ModuleLayer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const latch = (maxIndex = 1) => {
  const initialIndex = 0;

  let index = initialIndex;

  return () => {
    const thisIndex = index;

    const nextIndex = index + 1;
    index = nextIndex > maxIndex ? initialIndex : nextIndex;

    return thisIndex;
  };
};

const server = new DisplayServer({ port: 1337 });
server.listen();

const displayTest = new Display('test');
server.addDisplay(displayTest);

const displayArbeitszimmer = new Display('arbeitszimmer');
server.addDisplay(displayArbeitszimmer);

const displaySchlafzimmer = new Display('schlafzimmer');
server.addDisplay(displaySchlafzimmer);

const displayKueche = new Display('kueche');
server.addDisplay(displayKueche);

const displayEsszimmer = new Display('esszimmer');
server.addDisplay(displayEsszimmer);

const displayWohnzimmer = new Display('wohnzimmer');
server.addDisplay(displayWohnzimmer);

const ringTimeLayer = new ModuleLayer(
  new Asset('/ufi-static/ring-time/index.js', {
    type: 'modulepreload',
  }),
  new Asset('/ufi-static/utils/time.js', {
    type: 'modulepreload',
  }),
  new Asset('/ufi-static/ring-time/index.css', {
    type: 'style',
  })
);
ringTimeLayer.setState({
  layout: {
    fromColumn: 1,
    toColumn: 12,
    fromRow: 1,
    toRow: 12,
  },
});

const mobaTimeAssets = [
  new Asset('/ufi-static/moba-time/index.js', {
    type: 'modulepreload',
  }),
  new Asset('/ufi-static/utils/easing.js', {
    type: 'modulepreload',
  }),
  new Asset('/ufi-static/moba-time/index.css', {
    type: 'style',
  }),
];

const mobaTimeLayerModern = new ModuleLayer(...mobaTimeAssets);
mobaTimeLayerModern.setState({
  data: {
    style: {
      borderColor: '#3b3a3c',
      faceColor: '#f2f2f7',
      fillColor: 'transparent',
      hoursHandColor: '#f2f2f7',
      labelColor: '#f2f2f7',
      minutesHandColor: '#f2f2f7',
    },
  },
  layout: {
    fromColumn: 1,
    toColumn: 12,
    fromRow: 1,
    toRow: 12,
  },
});

const mobaTimeLayerClassic = new ModuleLayer(...mobaTimeAssets);
mobaTimeLayerClassic.setState({
  data: {
    config: {
      design: 'classic',
    },
    style: {
      faceColor: '#f2f2f7',
      fillColor: 'transparent',
      hoursHandColor: '#f2f2f7',
      labelColor: '#f2f2f7',
      minutesHandColor: '#f2f2f7',
    },
  },
  layout: {
    fromColumn: 1,
    toColumn: 12,
    fromRow: 1,
    toRow: 12,
  },
});

const presentationTime = new Presentation();
presentationTime.preloadLayer(ringTimeLayer);
presentationTime.preloadLayer(mobaTimeLayerModern);
presentationTime.preloadLayer(mobaTimeLayerClassic);
presentationTime.setLayers([mobaTimeLayerModern]);

const presentationGlobal = new Presentation();

displayTest.setPresentations([presentationGlobal]);

displayArbeitszimmer.setPresentations([presentationGlobal]);

displaySchlafzimmer.setPresentations([presentationGlobal]);

displayKueche.setPresentations([presentationGlobal]);

displayEsszimmer.setPresentations([presentationGlobal]);

displayWohnzimmer.setPresentations([presentationGlobal]);

const triggerServer = new Server();
triggerServer.listen(1338);

const presentationImages = new Presentation();

const preloadedImages =
  /** @type {Map<String, import('../lib/layer').AnyLayer>} */ (new Map());

const clock = latch(2);
const clocks = [ringTimeLayer, mobaTimeLayerModern, mobaTimeLayerClassic];

/**
 * @param {import('http').IncomingMessage} request
 * @param {(data: string) => void} callback
 */
const handlePostData = (request, callback) => {
  if (request.method === 'POST') {
    const body = /** @type {Buffer[]} */ ([]);

    request.on('data', (data) => {
      body.push(data);
    });

    request.on('end', () => {
      const data = Buffer.concat(body).toString();
      callback(data);
    });
  }
};

/**
 * @param {string} url
 */
const createImageLayer = (url) => {
  let asset;

  if (url) {
    try {
      asset = new Asset(url, {
        type: 'image',
      });
    } catch (_) {
      // noop
    }
  }

  if (!url || !asset) return null;

  const imageLayer = new ImageLayer(asset);
  imageLayer.setState({
    layout: {
      fromColumn: 1,
      toColumn: 12,
      fromRow: 1,
      toRow: 12,
      backgroundColor: 'black',
    },
  });

  return imageLayer;
};

/**
 * @param {string} url
 */
const handleImagePreload = (url) => {
  const imageLayer = createImageLayer(url);

  if (!imageLayer) return;

  preloadedImages.set(url, imageLayer);
  presentationImages.preloadLayer(imageLayer);
};

/**
 * @param {string} url
 */
const handleImageDisplay = (url) => {
  if (!url) return;

  let imageLayer = preloadedImages.get(url);

  if (!imageLayer) {
    imageLayer = createImageLayer(url);
  }

  if (!imageLayer) return;

  presentationTime.setLayers([clocks[clock()]]);
  presentationImages.setLayers([imageLayer]);
};

/**
 * @param {string} url
 */
const handleImageUnload = (url) => {
  presentationImages.setLayers([]);

  let imageLayer;
  if (url) {
    imageLayer = preloadedImages.get(url);
  }

  if (imageLayer) {
    presentationImages.unloadLayer(imageLayer);
    preloadedImages.delete(url);
  } else {
    preloadedImages.forEach((layer) => {
      presentationImages.unloadLayer(layer);
    });
    preloadedImages.clear();
  }
};

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
const handleResponse = (request, response) => {
  const finish = () => {
    server.commit();

    response.writeHead(200);
    response.end();
  };

  switch (request.url) {
    case '/on':
      presentationGlobal.setLayers([presentationTime, presentationImages]);

      finish();
      break;
    case '/off':
      presentationGlobal.setLayers([]);

      finish();
      break;
    case '/image_preload':
      handlePostData(request, (url) => {
        handleImagePreload(url);
        finish();
      });
      break;
    case '/image_display':
      handlePostData(request, (url) => {
        handleImageDisplay(url);
        finish();
      });
      break;
    case '/image_unload':
      handlePostData(request, (url) => {
        handleImageUnload(url);
        finish();
      });
      break;
    default:
      finish();
  }
};

triggerServer.on('request', handleResponse);
