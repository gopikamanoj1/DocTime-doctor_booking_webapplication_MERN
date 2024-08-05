

import { Request, Response } from "express";
import {uploadImage} from "../../../../utils/imagesService";

export default (dependencies: any) => {
    const { kycUseCase } = dependencies.useCase;

    if (!kycUseCase) {
        throw new Error("kycUseCase is not defined in dependencies");
    }

    const kycController = async (req: Request, res: Response) => {
        try {
            const { certificateImage, qualificationImage, aadhaarNumber, yearsOfExperience, hospitalName, email } = req.body;
            
            const certificateImageUrl = await uploadImage(certificateImage);
            const qualificationImageUrl = await uploadImage(qualificationImage);
            


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
