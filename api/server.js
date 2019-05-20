// -- IMPORTS -- //
const express = require("express");

// -- MIDDLEWARE -- //
const helmet = require("helmet");

// -- ROUTERS -- //
const projectsRouter = require("./projectsRouters");
const actionsRouter = require("./actionsRouter");

// -- SERVER -- //
const server = express();

// Set Up Server
server.use(express.json());
server.use(helmet());

// Use Routes
// Homepage Routing
server.get("/", (req, res) => {
  res.json({ message: "Sprint Prep" });
});

// Individual Routes
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// EXPORT SERVER
module.exports = server;
