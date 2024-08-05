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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
exports.default = (dependencies) => {
    const { registerUseCase } = dependencies.useCase;
    const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract necessary data from the request body
            const { name, email, password } = req.body;
            // Hash the password
            const hashedPassword = yield (0, utils_1.hashPassword)(password);
            const data = {
                name,
                email,
                password: hashedPassword,
            };
            req.session.userData = data;
            // Call the register use case
            const response = yield registerUseCase(dependencies).executeFunction(data);
            console.log(response, "response");
            if (response.status) {
                req.session.Otp = response.data;
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
            if (response.status === false) {
                console.log("User already exists:", response.data);
            }
        }
        catch (error) {
            console.error("Error in register controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return registerController;
};
