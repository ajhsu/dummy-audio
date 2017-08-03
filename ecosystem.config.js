module.exports = {
  apps: [
    {
      name: 'dummy-audio',
      script: 'build/app.js',
      watch: ['build'],
      ignore_watch: ['lib, caches']
    }
  ]
};
