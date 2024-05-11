"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAudioToS3 = exports.uploadToS3 = void 0;
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
const uploadAudioToS3 = async (audioBase64, fileName) => {
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
};
exports.uploadAudioToS3 = uploadAudioToS3;
//=================//====================//====================//====================//=====================//===================//
const uploadToS3 = async (file, fileName) => {
    // const uploadToS3 = async (file: any, fileName: string): Promise<void> => {
    const fileExtension = getFileExtension(file); // Function to get the file extension
    const contentType = getContentType(fileExtension); // Function to get the content type
    const convertedFile = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    console.log(convertedFile);
    const params = {
        Bucket: 'doctime3',
        Key: fileName,
        Body: convertedFile,
        ACL: 'public-read',
        ContentType: contentType,
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.log(err, 'ERROR FROM S3');
                reject(err);
            }
            else {
                console.log("SUCCESS FROM S3");
                resolve(data.Location);
            }
        });
    });
};
exports.uploadToS3 = uploadToS3;
const deleteFromS3 = async (fileName) => {
    const params = {
        Bucket: 'doctime3',
        Key: fileName,
    };
    return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err, data) => {
            if (err) {
                // Ignore error if the file doesn't exist
                if (err.code === 'NoSuchKey') {
                    resolve();
                }
                else {
                    reject(err);
                }
            }
            else {
                resolve();
            }
        });
    });
};
const getFileExtension = (file) => {
    // Extract the file extension from the data URI
    const matches = /^data:image\/([a-zA-Z+]+);base64,/.exec(file);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    return ''; // Return empty string if file extension is not found
};
const getContentType = (extension) => {
    // Map file extensions to content types
    switch (extension.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
        // Add more cases for other file types if needed
        default:
            return 'application/octet-stream'; // Default content type
    }
};
