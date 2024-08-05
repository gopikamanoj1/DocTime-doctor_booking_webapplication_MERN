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
exports.verifyHashPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
});
exports.hashPassword = hashPassword;
const verifyHashPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(password, hashedPassword, "comparing");
        const match = yield bcryptjs_1.default.compare(password, hashedPassword);
        return match;
    }
    catch (error) {
        throw new Error('Error verifying password');
    }
});
exports.verifyHashPassword = verifyHashPassword;
