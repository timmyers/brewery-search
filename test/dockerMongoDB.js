const Promise = require('bluebird');
const Docker = require('dockerode');
const _ = require('lodash');
const debug = require('debug')('test:init:docker-mongo-db');

const docker = new Docker();

const imageName = 'brewTestMongodb';

// Returns a promise that resolves when MongoDB is running in docker.
const mongoDBInit = () => new Promise((resolve, reject) => {
  docker.listContainers({
    all: true,
  }, (err, containers) => {
    const containerIndex = _.findIndex(containers, (containerInfo) => {
      const names = containerInfo.Names;
      if (names.includes(`/${imageName}`)) {
        return true;
      }
      return false;
    });

    if (containerIndex === -1) {
      debug('Container not found, creating.');
      docker.createContainer({
        Image: 'mongo',
        name: 'brewTestMongodb',
        ExposedPorts: {
          '27017/tcp': {},
        },
        PortBindings: {
          '27017/tcp': [
            { HostPort: '27017' },
          ],
        },
      },
      (createErr, container) => {
        if (createErr) {
          return reject(createErr);
        }

        debug('Starting newly created container');
        return container.start((startErr) => {
          if (startErr) {
            return reject(startErr);
          }
          debug('Container started, give 5 seconds to get going.');
          return setTimeout(() => {
            resolve();
          }, 5000);
        });
      });
    } else {
      const containerInfo = containers[containerIndex];

      if (containerInfo.State === 'running') {
        debug('Container found already running.');
        return resolve();
      }

      debug('Container found not running: ', containerInfo.State);

      const container = docker.getContainer(containerInfo.Id);

      debug('Restarting existing container');
      container.start((startErr) => {
        if (startErr) {
          return reject(startErr);
        }
        return resolve();
      });
    }
  });
});

// Returns a promise that resolves when MongoDB is running in docker.
// const mongoDBInit = () => new Promise((resolve, reject) => {
  // docker.createContainer({
  //   Image: 'mongo',
  //   name: 'brewTestMongodb',
  //   ExposedPorts: {
  //     '27017/tcp': {},
  //   },
  //   PortBindings: {
  //     '27017/tcp': [
  //       { HostPort: '27017' },
  //     ],
  //   },
  // },
  // (err, container) => {
  //   if (err) {
  //     return reject(err);
  //   }
  //
  //   return container.start((startErr) => {
  //     if (startErr) {
  //       reject(startErr);
  //     } else {
  //       resolve();
  //     }
  //   });
  // });
// });

module.exports = mongoDBInit;
