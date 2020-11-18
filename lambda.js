const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app')

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];

const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};


// eslint-disable-next-line import/prefer-default-export
module.exports.handler = handler;
