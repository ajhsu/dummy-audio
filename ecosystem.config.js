module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'dummy-audio',
      script: 'index.js',
      watch: ['lib'],
      ignore_watch: ['caches']
    }
  ]
};
