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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAudioToS3 = exports.uploadImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// AWS.config.update({
//     accessKeyId: process.env.YOUR_ACCESS_KEY_ID as string ,
//     secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY as string,
//     region: process.env.YOUR_REGION  as string 
// });
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
    secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    region: process.env.YOUR_REGION
});
const getAudioContentType = (extension) => {
    switch (extension.toLowerCase()) {
        case 'mp3':
            return 'audio/mpeg';
        case 'wav':
            return 'audio/wav';
        case 'ogg':
            return 'audio/ogg';
        default:
            return 'application/octet-stream';
    }
};
const convertBase64ToBuffer = (base64) => {
    const base64Data = base64.replace(/^data:audio\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
};
const uploadAudioToS3 = (audioBase64, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, ''); // Strip metadata
    const buffer = Buffer.from(base64Data, 'base64'); // Convert to buffer
    const params = {
        Bucket: 'doctime3',
        Key: fileName,
        Body: buffer,
        ContentType: 'audio/mpeg', // Change based on the audio type
    };
    console.log(params, "jjjj");
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Location); // Return the file URL
            }
        });
    });
});
exports.uploadAudioToS3 = uploadAudioToS3;
//=================//====================//====================//====================//=====================//===================//
//=================//====================//====================//====================//=====================//===================//
//=================//====================//====================//====================//=====================//===================//
// const uploadToS3 = async (file: any, fileName: string): Promise<string> => {
// // const uploadToS3 = async (file: any, fileName: string): Promise<void> => {
//     const fileExtension = getFileExtension(file); // Function to get the file extension
//     const contentType = getContentType(fileExtension); // Function to get the content type
//     const convertedFile: any =  Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
//          console.log(convertedFile);
//     const params = {
//         Bucket: 'doctime3',
//         Key: fileName,
//         Body: convertedFile,
//         // ACL: 'public-read',
//         ContentType: contentType,
//     };
//     return new Promise((resolve, reject) => {
//         s3.upload(params, (err: any, data: any) => {
//             if (err) {
//               console.log(err,'ERROR FROM S3');
//                 reject(err);
//             } else {
//               console.log("SUCCESS FROM S3");
//                 resolve(data.Location);
//             }
//         });
//     });
// };
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig"));
const uploadImage = (base64Image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinaryConfig_1.default.uploader.upload(base64Image, {
            folder: 'images',
            resource_type: 'image' // Explicitly specify resource type as image
        });
        return result.secure_url;
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
});
exports.uploadImage = uploadImage;
exports.default = uploadImage;
