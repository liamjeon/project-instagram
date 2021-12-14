const { sequelize } = require("./models/models");
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// await sequelize.sync({ force: true });
// await sequelize.sync();

sequelize
  .sync({ force: true })
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
