const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { HTMLSlide, ImageSlide, ReactSlide } = require('../lib/slide');
const { Layer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const server = new DisplayServer({ port: 1337 });
server.listen();

const displayTest = new Display('test');
server.addDisplay(displayTest);

const placekittenJPG = new Asset('https://placekitten.com/1920/1200', {
  type: 'image',
  MIMEType: 'image/jpeg'
});

const exampleHTML = new Asset('https://example.com', {
  type: 'document'
});

const reactModule = new Asset('http://ufi.mom.net.wurstsalat.cloud/ufi-assets/js/example-module.js', {
  type: 'modulepreload'
});

const imageSlide = new ImageSlide(placekittenJPG);
const htmlSlide = new HTMLSlide(exampleHTML);
const reactSlide = new ReactSlide(reactModule);

const presentation0 = new Presentation();
const presentation1 = new Presentation();

const layer0 = new Layer(imageSlide);
const layer1 = new Layer(htmlSlide);
const layer2 = new Layer(reactSlide);

layer2.classList.add('bottom-half');

presentation0.loadSlide(htmlSlide);
presentation1.loadSlide(reactSlide);

displayTest.setPresentations([
  presentation0,
  presentation1
]);

let state = 0;

setInterval(() => {
  switch (state) {
    case 0:
      layer0.classList.replace('right-half', 'left-half');
      layer1.classList.replace('left-half', 'right-half');

      presentation1.setLayers([layer2]);
      presentation0.setLayers([layer0, layer1]);
      break;
    case 1:
      layer0.classList.replace('left-half', 'right-half');
      layer1.classList.replace('right-half', 'left-half');

      presentation0.setLayers([layer1, layer0]);
      break;
    case 2:
      presentation0.setLayers([layer0]);
      break;
    case 3:
      presentation0.setLayers([layer1]);
      break;
    case 4:
      presentation0.setLayers([]);
      break;
    case 5:
      presentation1.setLayers([]);
      break;
    default:
  }

  state = (state === 5) ? 0 : (state + 1);
}, 10000);

module.exports = undefined;
