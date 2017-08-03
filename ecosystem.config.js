module.exports = {
  apps: [
    {
      name: 'dummy-audio',
      script: 'index.js',
      watch: ['lib'],
      ignore_watch: ['caches']
    }
  ]
};
