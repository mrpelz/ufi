const { Server } = require('http');

const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ImageLayer, ModuleLayer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');


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
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/ring-time/index.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/utils/time.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/ring-time/index.css', {
    type: 'style'
  })
);

const presentationGlobal = new Presentation();

displayTest.setPresentations([
  presentationGlobal
]);

displayArbeitszimmer.setPresentations([
  presentationGlobal
]);

displaySchlafzimmer.setPresentations([
  presentationGlobal
]);

displayKueche.setPresentations([
  presentationGlobal
]);

displayEsszimmer.setPresentations([
  presentationGlobal
]);

displayWohnzimmer.setPresentations([
  presentationGlobal
]);


const triggerServer = new Server();
triggerServer.listen(1338);


const twitterPresentation = new Presentation();

/**
 * @param {string} body
 */
const handleTweetImage = (body) => {
  let asset;

  try {
    asset = new Asset(body, {
      type: 'image'
    });
  } catch (_) {
    // noop
  }

  if (!asset) return;

  const imageLayer = new ImageLayer(asset);
  imageLayer.setState({
    layout: {
      fromColumn: 1,
      toColumn: 12,
      fromRow: 1,
      toRow: 12
    }
  });

  twitterPresentation.setLayers([imageLayer]);

  setTimeout(() => {
    twitterPresentation.setLayers([]);
  }, 10000);
};


/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
const handleResponse = (request, response) => {
  // eslint-disable-next-line default-case
  switch (request.url) {
    case '/on':
      presentationGlobal.setLayers([
        ringTimeLayer,
        twitterPresentation
      ]);
      break;
    case '/off':
      presentationGlobal.setLayers([]);
      break;
    case '/tweet_image':
      if (request.method === 'POST') {
        let body = '';

        request.on('data', (data) => {
          body += data;
        });

        request.on('end', () => {
          handleTweetImage(body);
        });
      }
      break;
  }

  response.writeHead(200);
  response.end();
};

triggerServer.on('request', handleResponse);
