const { sequelize } = require("./models/models");
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  // await sequelize.sync();
  await sequelize.sync({
    // force: true,
  });
  // await sequelize.authenticate();

  server.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
