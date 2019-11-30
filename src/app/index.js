const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ModuleLayer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const server = new DisplayServer({ port: 1337 });
server.listen();

const displayTest = new Display('test');
const displayArbeitszimmer = new Display('arbeitszimmer');
server.addDisplay(displayTest);
server.addDisplay(displayArbeitszimmer);

const clockLayer = new ModuleLayer(
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/clock/index.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/clock/index.css', {
    type: 'style'
  })
);

const presentation0 = new Presentation();

presentation0.setLayers([clockLayer]);

displayTest.setPresentations([
  presentation0
]);
displayArbeitszimmer.setPresentations([
  presentation0
]);

module.exports = undefined;
