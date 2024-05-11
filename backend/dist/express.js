"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const http_1 = __importDefault(require("http"));
const cookieParser = require("cookie-parser");
const express_session_1 = require("express-session");
const expressConfig = (app) => {
    const server = http_1.default.createServer(app);
    const store = new express_session_1.MemoryStore();
    app.use(body_parser_1.default.json({ limit: "5000mb" }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIEPARSERSECRET));
    app.use(express_1.default.static("public/"));
    app.use((0, cors_1.default)({
        origin: ["https://doctime.live"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    }));
    // Configure AWS S3
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
        secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
        region: process.env.YOUR_REGION,
    });
    return s3;
};
exports.default = expressConfig;
