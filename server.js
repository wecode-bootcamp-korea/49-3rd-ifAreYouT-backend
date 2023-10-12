require("dotenv").config();
const app = require("./app");
const port = process.env.PORT;

app.listen(port || 8000, () => {
  console.log(`server is running at ${app.get("port")}`);
});
