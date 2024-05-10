"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imagesService_1 = require("../../../../utils/imagesService");
exports.default = (dependencies) => {
    const { kycUseCase } = dependencies.useCase;
    if (!kycUseCase) {
        throw new Error("kycUseCase is not defined in dependencies");
    }
    const kycController = async (req, res) => {
        try {
            const { certificateImage, qualificationImage, aadhaarNumber, yearsOfExperience, hospitalName, email } = req.body;
            const certificateImageUrl = await (0, imagesService_1.uploadToS3)(certificateImage, `${email}-certificate.jpg`);
            const qualificationImageUrl = await (0, imagesService_1.uploadToS3)(qualificationImage, `${email}-qualification.jpg`);
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
            const response = await kycUseCase(dependencies).executeFunction(data);
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
    };
    return kycController;
};
