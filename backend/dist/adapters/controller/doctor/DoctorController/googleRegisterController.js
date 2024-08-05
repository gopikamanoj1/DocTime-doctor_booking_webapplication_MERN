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
function googleRegisterController(dependencies) {
    const { googleRegisterUseCase } = dependencies.useCase;
    if (!googleRegisterUseCase) {
        throw new Error("googleRegisterUseCase is not defined in dependencies");
    }
    const googleRegisterController = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract necessary data from the request body
            const { googleId, name, email } = req.body;
            // Create an object with the necessary data
            const data = {
                googleId,
                name,
                email,
            };
            // Call the register use case with the data
            const response = yield googleRegisterUseCase(dependencies).executeFunction(data);
            // Check the response from the register use case
            if (response.status) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            // Handle errors
            console.error("Error in Google register controller:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return googleRegisterController;
}
exports.default = googleRegisterController;
