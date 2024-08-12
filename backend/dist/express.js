"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const imagesService_1 = __importDefault(require("./utils/imagesService"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
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
        origin: ["http://localhost:5173", "http://localhost:3000", 'https://doctime-doctor-booking-webapplication-42qm.onrender.com', 'https://doctime-doctor-booking-webapplication.onrender.com', 'https://doctime.live', 'http://doctime.live'],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    }));
    const upload = (0, multer_1.default)({ dest: 'uploads/' });
    app.post('/upload', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const imageUrl = yield (0, imagesService_1.default)(req.file.path);
            // Delete the temporary file
            fs_1.default.unlink(path_1.default.resolve(req.file.path), (err) => {
                if (err)
                    console.error('Error deleting temp file:', err);
            });
            res.status(200).json({ imageUrl });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to upload image' });
        }
    }));
    // Configure AWS S3
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    //   region: process.env.YOUR_REGION,
    // });
    // return s3;
};
exports.default = expressConfig;
