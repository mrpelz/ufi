const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { HTMLLayer, ImageLayer, ModuleLayer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const server = new DisplayServer({ port: 1337 });
server.listen();

const displayTest = new Display('test');
server.addDisplay(displayTest);

const imageLayer = new ImageLayer(
  new Asset('https://placekitten.com/1920/1200', {
    type: 'image',
    MIMEType: 'image/jpeg'
  })
);
const htmlLayer = new HTMLLayer(
  new Asset('https://example.com', {
    type: 'document'
  })
);
const moduleLayer = new ModuleLayer(
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-assets/js/example-module.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-assets/css/example-style.css', {
    type: 'style'
  })
);
const clockLayer = new ModuleLayer(
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/clock/index.js', {
    type: 'modulepreload'
  }),
  new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-static/clock/index.css', {
    type: 'style'
  })
);

const presentation0 = new Presentation();
const presentation1 = new Presentation();
const presentation2 = new Presentation();

moduleLayer.classList.add('bottom-half');

presentation1.preloadLayer(htmlLayer);
presentation2.preloadLayer(moduleLayer);

presentation0.setLayers([clockLayer]);

displayTest.setPresentations([
  presentation0,
  presentation1,
  presentation2
]);

let state = 0;

setInterval(() => {
  switch (state) {
    case 0:
      imageLayer.classList.replace('right-half', 'left-half');
      htmlLayer.classList.replace('left-half', 'right-half');

      presentation2.setLayers([moduleLayer]);
      presentation1.setLayers([imageLayer, htmlLayer]);
      break;
    case 1:
      imageLayer.classList.replace('left-half', 'right-half');
      htmlLayer.classList.replace('right-half', 'left-half');

      presentation1.setLayers([htmlLayer, imageLayer]);
      break;
    case 2:
      presentation1.setLayers([imageLayer]);
      break;
    case 3:
      presentation1.setLayers([htmlLayer]);
      break;
    case 4:
      presentation1.setLayers([]);
      break;
    case 5:
      presentation2.setLayers([]);
      break;
    default:
  }

  state = (state === 5) ? 0 : (state + 1);
}, 10000);

module.exports = undefined;
