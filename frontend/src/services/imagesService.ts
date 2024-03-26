import AWS from 'aws-sdk';

const BUCKET_NAME: string = "doctime" || ''; // Make sure to replace '' with your actual bucket name
const s3 = new AWS.S3({});

/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */
async function upload(imageName: string, base64Image: string, type: string): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: `${BUCKET_NAME}/images`,
        Key: imageName,
        Body: Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
        ContentType: type
    };

    try {
        const data: AWS.S3.ManagedUpload.SendData = await promiseUpload(params);
        return data.Location || '';
    } catch (error) {
        console.error(error);
        return '';
    }
}

/**
 * @description Promisify an upload to S3
 * @param params S3 bucket params
 * @return Promise<AWS.S3.ManagedUpload.SendData> S3 response object
 */
function promiseUpload(params: AWS.S3.PutObjectRequest): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
        s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export { upload };
