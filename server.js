const { sequelize } = require("./models/models");
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

async function startServer() {
  // await sequelize.sync({ force: true });
  await sequelize.sync();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
