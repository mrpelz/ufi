const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { HTMLSlide, ImageSlide } = require('../lib/slide');
const { Layer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const server = new DisplayServer({ port: 1337 });
server.listen();

const display = new Display('test');
server.addDisplay(display);

const asset0 = new Asset('https://placekitten.com/1920/1200', {
  type: 'image',
  MIMEType: 'image/jpeg'
});

const asset1 = new Asset('https://example.com', {
  type: 'document'
});

const slide0 = new ImageSlide(asset0);
const slide1 = new HTMLSlide(asset1);

const presentation = new Presentation();

presentation.loadSlide(slide0);
presentation.loadSlide(slide1);

display.setPresentations([
  presentation
]);

const layer0 = new Layer(slide0);
const layer1 = new Layer(slide1);

layer1.classList.add('left-half');


let state = 0;

setInterval(() => {
  switch (state) {
    case 0:
      presentation.setLayers([layer0, layer1]);
      break;
    case 1:
      presentation.setLayers([layer1, layer0]);
      break;
    case 2:
      presentation.setLayers([layer0]);
      break;
    case 3:
      presentation.setLayers([layer1]);
      break;
    case 4:
      presentation.setLayers([]);
      break;
    default:
  }

  state = (state === 4) ? 0 : (state + 1);
}, 10000);

module.exports = undefined;
