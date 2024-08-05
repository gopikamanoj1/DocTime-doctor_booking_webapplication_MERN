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
    const { getKycStatusUseCase } = dependencies.useCase;
    const getKycStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const data = {
                id
            };
            const response = yield getKycStatusUseCase(dependencies).executeFunction(data);
            console.log(response, "contro res");
            if (response.status) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                res.status(500).json({ status: false, data: "error in getting status" });
            }
        }
        catch (error) {
            console.log(error, "error in getKycStatusController");
            res.status(500).json({ status: false, message: 'Error in getKycStatusController' });
        }
    });
    return getKycStatusController;
};
