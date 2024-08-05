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
    const { searchDoctrsUseCase } = dependecies.useCase;
    const searchDoctrsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchParams = {
                doctorName: req.body.doctorName
            };
            const response = yield searchDoctrsUseCase(dependecies).executeFunction(searchParams);
            if (response.status) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, messege: response.messege });
            }
        }
        catch (error) {
            console.log(error, "error in searchDoctorsController ");
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });
    return searchDoctrsController;
};
