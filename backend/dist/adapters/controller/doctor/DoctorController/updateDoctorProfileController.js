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
    const { updateDoctorProfileUseCase } = dependencies.useCase;
    if (!updateDoctorProfileUseCase) {
        console.log('error ');
    }
    const updateDoctorProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, phone, specialization, street, city, state, fees, image, age, dob } = req.body;
            let imageUrl = null; // Default value for imageUrl
            if (image) {
                // Upload to Cloudinary if an image is provided
                imageUrl = yield (0, imagesService_1.uploadImage)(image);
            }
            const data = {
                name,
                email,
                phone,
                specialization,
                street,
                city,
                state,
                fees,
                age,
                dob,
                image: imageUrl
            };
            const response = yield updateDoctorProfileUseCase(dependencies).executeFunction(data);
            if (response) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                return ({ status: false, messege: "error in updation" });
            }
        }
        catch (error) {
            console.log(error, "error in profile controller ");
        }
    });
    return updateDoctorProfileController;
};
