
import { uploadAudioToS3 } from "../../../utils/imagesService";

export default function sendAudioUseCase(dependencies: any) {
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
        const audioUrl = await uploadAudioToS3(content, fileName);
        console.log(audioUrl, "audioUrl");


        const data = {
            recieverId,
            senderId,
            type,
            converstationId,
            timestamp,
            content: audioUrl, // Replace base64 with S3 URL
        };
        console.log("koko", data);

        const response = await userRepositery.sendAudio(data)
        console.log(response, "use resssso");

        if (response.status) {
            return { status: true, data: response.data };
        } else {
            return { status: false, message: response.message };
        }

    };

    return { executeFunction };
}
