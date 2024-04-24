




import { Request, Response } from "express";
import uploadToS3 from "../../../../utils/imagesService";

export default (dependencies: any) => {
    const { kycUseCase } = dependencies.useCase;

    if (!kycUseCase) {
        throw new Error("kycUseCase is not defined in dependencies");
    }

    const kycController = async (req: Request, res: Response) => {
        try {
            const { certificateImage, qualificationImage, aadhaarNumber, yearsOfExperience, hospitalName, email } = req.body;
            
            const certificateImageUrl = await uploadToS3(certificateImage, `${email}-certificate.jpg`);
            const qualificationImageUrl = await uploadToS3(qualificationImage, `${email}-qualification.jpg`);
            


            const data = {
                kycDetails: [{
                    certificateImage:  certificateImageUrl ,
                    qualificationImage:  qualificationImageUrl ,
                    aadhaarNumber,
                    yearsOfExperience,
                    hospitalName
                }],
                email
            };

            const response = await kycUseCase(dependencies).executeFunction(data);

            if (response.status) {
                req.session.kycData = response.data;
                res.json({ status: true });
            } else {
                res.json({ status: false, message: response.message });
            }
        } catch (error) {
            console.error("Error in kycController:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    };

    return kycController;
};
