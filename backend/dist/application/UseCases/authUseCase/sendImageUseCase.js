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
const imagesService_1 = require("../../../utils/imagesService");
function sendImageUseCase(dependencies) {
    const { userRepositery } = dependencies.repositery;
    const executeFunction = (audioData) => __awaiter(this, void 0, void 0, function* () {
        const { content, recieverId, senderId, type, converstationId, timestamp, } = audioData;
        // Generate a unique filename for the S3 upload
        const fileName = `${senderId}_${converstationId}_${Date.now()}.mp3`;
        // Upload the audio to S3 and get the file URL
        let imageUrl = yield (0, imagesService_1.uploadImage)(content);
        const data = {
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
            content: imageUrl,
        };
        const response = yield userRepositery.sendImage(data);
        console.log(response, "image sending usecase ");
        if (response.status) {
            return { status: true, data: response.data };
        }
        else {
            return { status: false, message: response.message };
        }
    });
    return { executeFunction };
}
exports.default = sendImageUseCase;
