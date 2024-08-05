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
const imagesService_1 = require("../../../../utils/imagesService");
exports.default = (dependencies) => {
    const { kycUseCase } = dependencies.useCase;
    if (!kycUseCase) {
        throw new Error("kycUseCase is not defined in dependencies");
    }
    const kycController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { certificateImage, qualificationImage, aadhaarNumber, yearsOfExperience, hospitalName, email } = req.body;
            const certificateImageUrl = yield (0, imagesService_1.uploadImage)(certificateImage);
            const qualificationImageUrl = yield (0, imagesService_1.uploadImage)(qualificationImage);
            const data = {
                kycDetails: [{
                        certificateImage: certificateImageUrl,
                        qualificationImage: qualificationImageUrl,
                        aadhaarNumber,
                        yearsOfExperience,
                        hospitalName
                    }],
                email
            };
            const response = yield kycUseCase(dependencies).executeFunction(data);
            if (response.status) {
                req.session.kycData = response.data;
                res.json({ status: true });
            }
            else {
                res.json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error("Error in kycController:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return kycController;
};
