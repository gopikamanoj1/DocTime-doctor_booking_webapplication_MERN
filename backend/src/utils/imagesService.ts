import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
    secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
    region: process.env.YOUR_REGION 
  });

const s3 = new AWS.S3();

const uploadToS3 = async (file: any, fileName: string): Promise<void> => {
    const fileExtension = getFileExtension(file); // Function to get the file extension
    const contentType = getContentType(fileExtension); // Function to get the content type

    const convertedFile: any =  Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    console.log(convertedFile)

    const params = {
        Bucket: 'doctime3',
        Key: fileName,
        Body: convertedFile,
        // ACL: 'public-read',
        ContentType: contentType,
    };

    console.log(params, "Upload params")

    return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
};

const getFileExtension = (file: string): string => {
    // Extract the file extension from the data URI
    const matches = /^data:image\/([a-zA-Z+]+);base64,/.exec(file);
    if (matches && matches.length > 1) {
        return matches[1];
    }
    return ''; // Return empty string if file extension is not found
};

const getContentType = (extension: string): string => {
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

export default uploadToS3;
