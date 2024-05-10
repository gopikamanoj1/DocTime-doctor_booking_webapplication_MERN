"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imagesService_1 = require("../../../../utils/imagesService");
exports.default = (dependencies) => {
    const { updatePatientProfileUseCase } = dependencies.useCase;
    if (!updatePatientProfileUseCase) {
        console.log('EROOOOORRR');
    }
    const updatePatientProfileController = async (req, res) => {
        try {
            const { name, email, phone, street, city, state, zipcode, age, dob, gender, bloodGroup, image } = req.body;
            let imageUrl = null; // Default value for imageUrl
            if (image) {
                // Only upload to S3 if an image is provided
                imageUrl = await (0, imagesService_1.uploadToS3)(image, `${email}-PatientProfileImage`);
            }
            const data = {
                name,
                email,
                phone,
                gender,
                street,
                city,
                state,
                zipcode,
                bloodGroup,
                age,
                dob,
                image
            };
            if (imageUrl) {
                // Only add `image` if it exists
                data.image = imageUrl;
            }
            console.log(data, "Data in updatePatientProfileController");
            const response = await updatePatientProfileUseCase(dependencies).executeFunction(data);
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
    };
    return updatePatientProfileController;
};
