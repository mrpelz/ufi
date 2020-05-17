const { Server } = require('http');

const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ModuleLayer } = require('../lib/layer');
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

const mobaTimeAssets = [
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/moba-time/index.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/utils/easing.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/moba-time/index.css', {
    type: 'style'
  })
];

const mobaTimeLayer = new ModuleLayer(...mobaTimeAssets);
const mobaTimeLayerClassic = new ModuleLayer(...mobaTimeAssets);

const defaultLayers = [
  mobaTimeLayer,
  mobaTimeLayerClassic
];

mobaTimeLayer.setState({
  layout: {
    fromColumn: 2,
    toColumn: 6
  }
});

mobaTimeLayerClassic.setState({
  layout: {
    fromColumn: 8,
    toColumn: 11
  },
  data: {
    config: {
      design: 'classic'
    }
  }
});

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

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
const handleResponse = (request, response) => {
  // eslint-disable-next-line default-case
  switch (request.url) {
    case '/on':
      presentationGlobal.setLayers(defaultLayers);
      break;
    case '/off':
      presentationGlobal.setLayers([]);
      break;
  }

  response.writeHead(200);
  response.end();
};

triggerServer.on('request', handleResponse);
