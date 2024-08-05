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
exports.default = (dependencies) => {
    const { doctorSendMessegesUseCase } = dependencies.useCase;
    const doctorSendMessegesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, recieverId, senderId, type, converstationId, } = req.body;
            const data = {
                content,
                recieverId,
                senderId,
                type,
                converstationId
            };
            const response = yield doctorSendMessegesUseCase(dependencies).executeFunction(data);
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
        }
    });
    return doctorSendMessegesController;
};
