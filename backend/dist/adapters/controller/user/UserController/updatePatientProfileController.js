"use strict";
// import { Request, Response } from "express";
// import session from "express-session";
// import { uploadImage } from "../../../../utils/imagesService";
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
    const { updatePatientProfileUseCase } = dependencies.useCase;
    if (!updatePatientProfileUseCase) {
        console.log('EROOOOORRR');
    }
    const updatePatientProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, phone, street, city, state, age, dob, gender, bloodGroup, image } = req.body;
            let imageUrl = null; // Default value for imageUrl
            if (image) {
                imageUrl = yield (0, imagesService_1.uploadImage)(image);
            }
            const data = {
                name,
                email,
                phone,
                gender,
                street,
                city,
                state,
                bloodGroup,
                age,
                dob,
                image: imageUrl // Use the uploaded image URL
            };
            console.log(data, "Data in updatePatientProfileController");
            const response = yield updatePatientProfileUseCase(dependencies).executeFunction(data);
            if (response && response.data) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                res.status(400).json({ status: false, message: "Error updating profile" });
            }
        }
        catch (error) {
            console.error("Error in updatePatientProfileController:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    });
    return updatePatientProfileController;
};
