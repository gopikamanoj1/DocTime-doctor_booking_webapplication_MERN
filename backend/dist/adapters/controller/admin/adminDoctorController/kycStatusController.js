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
    const { kycStatusUseCase } = dependencies.useCase;
    const kycStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.params.doctorId;
            const newStatus = req.body.kycStatus; // Assuming the new status is sent in the request body
            const response = yield kycStatusUseCase(dependencies).executeFunction(doctorId, newStatus);
            if (response.status) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return kycStatusController;
};
