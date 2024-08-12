"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./server"));
const db_connect_1 = __importDefault(require("./config/db.connect"));
const Router_1 = require("./adapters/Router");
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("./express"));
const express_2 = __importDefault(require("express"));
const dependencies_1 = __importDefault(require("./frameworks/config/dependencies"));
const express_session_1 = __importStar(require("express-session"));
const app = (0, express_2.default)();
const server = http_1.default.createServer(app);
(0, db_connect_1.default)(config_1.default);
const store = new express_session_1.MemoryStore();
const sessionOptions = {
    secret: process.env.SESSION_SECRET_KEY || 'defaultSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 60 * 1000, // 30 minutes
        httpOnly: true,
    },
    store: store,
};
// Apply session middleware
app.use((0, express_session_1.default)(sessionOptions));
// Configure Express
(0, express_1.default)(app);
const io = require('socket.io')(server, {
    cors: { origin: ["http://localhost:5173", "http://localhost:3000", 'https://doctime-doctor-booking-webapplication-42qm.onrender.com', 'https://doctime.live', 'http://doctime.live']
    }
});
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.id === userId);
};
io.on("connection", (socket) => {
    console.log('connected', socket.id);
    socket.on('joinChat', (data) => {
        const { chatId, id } = data;
        // Check if the user already exists in the array
        const existingUserIndex = users.findIndex((user) => user.id === id);
        if (existingUserIndex === -1) {
            // If the user doesn't exist, add them to the array
            users.push({ id, socketId: socket.id });
        }
        else {
            users[existingUserIndex].socketId = socket.id;
        }
        console.log(users, 'Users in the socket connection');
    });
    socket.on('sendMessage', (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, recieverId, content, converstationId, type, timestamp, // Include the current timestamp
     }) {
        console.log('hihi');
        const { sendMessegesUseCase } = dependencies_1.default.useCase;
        const data = {
            content,
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
        };
        const response = yield sendMessegesUseCase(dependencies_1.default).executeFunction(data);
        if (response && response.status && response.data) {
            const recipient = users.find((user) => user.id === recieverId);
            const sender = users.find((user) => user.id === senderId);
            if (recipient) {
                console.log('in the resptned', recipient);
                io.to(recipient.socketId).to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type, timestamp });
            }
            else {
                console.log('in the sender', sender);
                io.to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type, timestamp });
            }
        }
    }));
    // ==================================================================================================================
    socket.on('sendImage', (_b) => __awaiter(void 0, [_b], void 0, function* ({ senderId, recieverId, content, converstationId, type, timestamp, // Include the current timestamp
     }) {
        console.log('image sending');
        const { sendImageUseCase } = dependencies_1.default.useCase;
        const data = {
            content,
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
        };
        const response = yield sendImageUseCase(dependencies_1.default).executeFunction(data);
        if (response && response.status && response.data) {
            const recipient = users.find((user) => user.id === recieverId);
            const sender = users.find((user) => user.id === senderId);
            if (recipient) {
                io.to(recipient.socketId).to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit('getMessage', { senderId, content: response.data.content, converstationId, recieverId, type, timestamp });
            }
            else {
                io.to(sender === null || sender === void 0 ? void 0 : sender.socketId).emit('getMessage', { senderId, content, converstationId, recieverId, type, timestamp });
            }
        }
    }));
    // ======================================================================================================================================
    // Handle the audioStream event when a client sends audio
    socket.on('audioStream', (_c) => __awaiter(void 0, [_c], void 0, function* ({ senderId, recieverId, content, converstationId, type, timestamp }) {
        console.log('Received audio data');
        // Use-case function to process and store the audio data
        const { sendAudioUseCase } = dependencies_1.default.useCase;
        const audioData = {
            content,
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
        };
        // Process and upload the audio data
        const response = yield sendAudioUseCase(dependencies_1.default).executeFunction(audioData);
        console.log(response, ";;;;;;;;;;;;");
        if (response && response.status && response.data) {
            // Find the users by ID
            const recipient = users.find((user) => user.id === recieverId);
            const sender = users.find((user) => user.id === senderId);
            if (recipient) {
                // Emit the message with the processed content (usually a URL to the stored audio)
                io.to(recipient.socketId).emit('getMessage', {
                    senderId,
                    content: response.data.content, // S3 URL or processed content
                    converstationId,
                    recieverId,
                    type,
                    timestamp,
                });
            }
            // Optionally, emit to the sender as well
            if (sender) {
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    content: response.data.content,
                    converstationId,
                    recieverId,
                    type,
                    timestamp,
                });
            }
        }
        else {
            console.error("Error handling audio data:", response === null || response === void 0 ? void 0 : response.message);
        }
    }));
    // ===================================================================================================================================
    socket.on("VideoCall", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { createConsultuseCase } = dependencies_1.default.useCase;
        console.log('here---', data);
        const { doctorId, userId, roomId, appointmentId } = data;
        const apiPayload = {
            userId,
            doctorId,
            appointmentId,
            roomId
        };
        const response = yield createConsultuseCase(dependencies_1.default).executeFunction(apiPayload);
        if (response.status) {
            console.log('suucesfully created', response.data);
            const user = getUser(userId);
            console.log(user, 'Users:::');
            const datas = {
                roomId,
                appointmentId
            };
            if (user) {
                io.to(user.socketId).emit('VideoCallResponce', datas);
            }
        }
    }));
    console.log(users, '-------users----------');
    socket.on('disconnect', () => {
        // Remove the disconnected user from the array
        users = users.filter((user) => user.socketId !== socket.id);
    });
    socket.on('error', (error) => {
        console.error(`Socket error for client ${socket.id}:`, error);
    });
});
app.use('/api', (0, Router_1.routes)(dependencies_1.default));
(0, server_1.default)(server, config_1.default).startServer();
