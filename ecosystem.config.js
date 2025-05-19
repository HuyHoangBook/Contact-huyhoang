module.exports = {
  apps: [
    {
      name: 'huyhoang-bookstore',
      script: 'serve',
      args: ['-s', '.', '-p', '9005'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
