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

clockLayer.setState({
  data: {
    borderColor: null,
    centerColor: null,
    faceColor: '#FFFFFF80',
    fillColor: null,
    labelColor: '#FFFFFF80',
    hoursHandColor: '#FFFFFF80',
    minutesHandColor: '#FFFFFF80',
    secondsHandColor: '#FF000080'
  }
});

const videoLayer = new VideoLayer(
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-assets/bin/greenland_3.mp4', {
    type: 'video'
  })
);

videoLayer.setState({
  layout: {
    spanColumns: 12,
    spanRows: 12
  }
});

const presentation0 = new Presentation();

presentation0.setLayers([videoLayer, clockLayer]);

displayTest.setPresentations([
  presentation0
]);
displayArbeitszimmer.setPresentations([
  presentation0
]);
