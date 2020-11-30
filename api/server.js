const express = require('express');
const server = express();
const actionsRouter = require('./actionsRouter')
const projectsRouter = require('./projectsRouter')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use('/api/actions', actionsRouter); 
server.use('/api/projects', projectsRouter);

module.exports = server;
