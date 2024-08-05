
import { uploadImage } from "../../../utils/imagesService";

export default function sendImageUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (audioData: any) => {
        const { content,
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp, } = audioData;

        // Generate a unique filename for the S3 upload
        const fileName = `${senderId}_${converstationId}_${Date.now()}.mp3`;

        // Upload the audio to S3 and get the file URL
        let imageUrl = await uploadImage(content);


        const data = {
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
            content: imageUrl,
        };

        const response = await userRepositery.sendImage(data)
        console.log(response, "image sending usecase ");

        if (response.status) {
            return { status: true, data: response.data };
        } else {
            return { status: false, message: response.message };
        }

    };

    return { executeFunction };
}
