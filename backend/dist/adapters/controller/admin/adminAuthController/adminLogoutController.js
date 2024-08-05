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
    const { adminLogoutUseCase } = dependencies.useCase;
    const adminLogoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        const data = {
            email
        };
        const responce = yield adminLogoutUseCase(dependencies).executeFunction(data);
        if (responce.status) {
            res.json({ status: true, data: responce.data });
        }
        else {
            res.json({ status: false, mmessege: responce.message });
        }
    });
    return adminLogoutController;
};
