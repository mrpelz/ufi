const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ModuleLayer, VideoLayer } = require('../lib/layer');
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
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/utils/easing.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/clock/index.css', {
    type: 'style'
  })
);

const videoLayer = new VideoLayer(
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-assets/bin/greenland_3.mp4', {
    type: 'video'
  })
);

const presentation0 = new Presentation();

presentation0.preloadLayer(clockLayer);
presentation0.preloadLayer(videoLayer);

const states = [
  [videoLayer, clockLayer],
  [videoLayer]
];
let counter = 0;

setInterval(() => {
  presentation0.setLayers(states[counter]);
  counter = counter === (states.length - 1) ? 0 : counter + 1;
}, 10000);

displayTest.setPresentations([
  presentation0
]);
displayArbeitszimmer.setPresentations([
  presentation0
]);
