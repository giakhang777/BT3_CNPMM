"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes/web");
const { connectMongo } = require("./config/mongo");
const app = express();
// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// View engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
// Routes (web.ts export = (app) => {...})
routes(app);
// Start server after Mongo connected
(async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/node_fullstack";
        await connectMongo(uri);
        const PORT = Number(process.env.PORT) || 3000;
        app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
    }
    catch (e) {
        console.error("❌ Mongo connection error:", e);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map