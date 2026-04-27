module.exports = {
  apps: [
    {
      name: 'ganeshaink-backend',
      cwd: '/home/ubuntu/ganeshaink/backend',
      script: 'src/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
    {
      name: 'ganeshaink-frontend',
      cwd: '/home/ubuntu/ganeshaink/frontend',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'ganeshaink-backoffice',
      cwd: '/home/ubuntu/ganeshaink/backoffice',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
  ],
};
