module.exports = {
  apps: [
    {
      name: 'huyhoang-bookstore',
      script: 'node',
      args: ['server.js'],
      env: {
        NODE_ENV: 'production',
        PORT: '9005'
      },
    },
  ],
};
