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
    const { getKycDetailsUseCase } = dependencies.useCase;
    const adminDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.params.doctorId; // Retrieve doctorId from query parameters
            // console.log(doctorId,"id kittiii");
            const response = yield getKycDetailsUseCase(dependencies).executeFunction(doctorId);
            console.log(response, "res kitii55");
            // Check if the response object and its data property are defined
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            }
            else {
                res.json({ status: false, message: "Data not found" });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    return adminDoctorController;
};
