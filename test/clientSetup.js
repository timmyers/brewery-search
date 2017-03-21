require('babel-register')({ // eslint-disable-line import/no-extraneous-dependencies
  plugins: ['transform-runtime'],
  presets: ['es2015', 'react', 'stage-0'],
});

const jsdom = require('jsdom').jsdom; // eslint-disable-line import/no-extraneous-dependencies

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

documentRef = document; // eslint-disable-line no-undef
