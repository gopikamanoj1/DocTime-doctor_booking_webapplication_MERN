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
exports.default = (dependecies) => {
    const { createConverstationUseCase } = dependecies.useCase;
    const createConverstationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { senderId, recieverId } = req.body;
            const data = {
                senderId, recieverId
            };
            const response = yield createConverstationUseCase(dependecies).executeFunction(data);
            console.log(response, "contro res");
            if (response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, data: response.data });
            }
        }
        catch (error) {
            console.error("Error in createConverstationUseCase:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });
    return createConverstationController;
};
