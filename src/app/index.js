const { Asset } = require('../lib/asset');
const { Display } = require('../lib/display');
const { DisplayServer } = require('../lib/server');
const { ImageSlide } = require('../lib/slide');
const { Layer } = require('../lib/layer');
const { Presentation } = require('../lib/presentation');

const server = new DisplayServer({ port: 1337 });
server.listen();

const display = new Display('arbeitszimmer');
server.addDisplay(display);

const asset = new Asset('https://placekitten.com/1280/720');
const slide = new ImageSlide(asset);

const presentation = new Presentation();

display.setPresentations([
  presentation
]);

presentation.loadSlide(slide);

setTimeout(() => {
  const layer = new Layer(slide);

  layer.setState({
    this: 'is',
    a: 1,
    STATE: true
  });

  layer.classList.add('first-class', 'second-class third-class');

  presentation.setLayers([layer]);

  layer.classList.remove('second-class');

  layer.setState({
    STATE: undefined
  });
}, 10000);

module.exports = undefined;
