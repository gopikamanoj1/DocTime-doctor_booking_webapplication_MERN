"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imagesService_1 = require("../../../utils/imagesService");
function sendImageUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = async (audioData) => {
        const { content, recieverId, senderId, type, converstationId, timestamp, } = audioData;
        // Generate a unique filename for the S3 upload
        const fileName = `${senderId}_${converstationId}_${Date.now()}.mp3`;
        // Upload the audio to S3 and get the file URL
        let imageUrl = await (0, imagesService_1.uploadToS3)(content, fileName);
        const data = {
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
            content: imageUrl,
        };
        console.log("koko image sending usecase data ", data);
        const response = await userRepositery.sendImage(data);
        console.log(response, "image sending usecase ");
        if (response.status) {
            return { status: true, data: response.data };
        }
        else {
            return { status: false, message: response.message };
        }
    };
    return { executeFunction };
}
exports.default = sendImageUseCase;
