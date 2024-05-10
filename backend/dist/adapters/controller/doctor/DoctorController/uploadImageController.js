"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imagesService_1 = require("../../../../utils/imagesService");
exports.default = (dependencies) => {
    const { sendImageUseCase } = dependencies.useCase;
    const uploadImageController = async (req, res) => {
        try {
            console.log("haiii");
            const { image } = req.body;
            console.log(image, "image");
            const imageUrl = await (0, imagesService_1.uploadToS3)(image, '-sendImage');
            const data = {
                imageUrl
            };
            const response = await sendImageUseCase(dependencies).executeFunction(data);
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
    };
    return uploadImageController;
};
