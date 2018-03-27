var config = {};

// config.IP ='192.168.1.2';
config.IP = process.env.PROJECTS_HOST || 'localhost';
config.PORT = process.env.PROJECTS_PORT || '8000';

module.exports = config;