const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();

// مسیر دیتابیس قابل نوشتن در Render
const tempDbPath = "/tmp/db.json";

// اگر فایل نسخه writable وجود ندارد، از نسخه اصلی کپی کن
if (!fs.existsSync(tempDbPath)) {
  fs.copyFileSync(path.join(__dirname, "db.json"), tempDbPath);
  console.log("db.json copied to /tmp/db.json");
}

// JSON Server باید از نسخه writable استفاده کند
const router = jsonServer.router(tempDbPath);

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`🚀 JSON Server running on port ${port}`);
});