import { Request, Response } from "express";
import session from "express-session";
import {uploadToS3} from "../../../../utils/imagesService";


export default (dependencies: any) => {
    const { updateDoctorProfileUseCase } = dependencies.useCase;

    if (!updateDoctorProfileUseCase) {
        console.log('EROOOOORRR');
        
    }

    const updateDoctorProfileController = async (req: Request, res: Response) => {
        try {

            console.log( process.env.YOUR_ACCESS_KEY_ID,'HHHHHHHHHHHHHHH');
            
            
            const { name, email, phone, specialization, street, city, state, zipcode, fees, image,age,dob } = req.body

            const imageUrl= await uploadToS3(image, `${email}-profileImage`);
            const data = {
                name,
                email,
                phone,
                specialization,
                street,
                city,
                state,
                zipcode,
                fees,
                image:imageUrl,
                age,
                dob
            }
            console.log(data,"data in updateDoctorProfileController");
            // req.session.doctorProfile = data;

            const response = await updateDoctorProfileUseCase(dependencies).executeFunction(data)
            // console.log(response,"res in new contro");
           
            

            if (response) {

                res.status(200).json({ status: true, data: response.data })
            } else {
                return ({ status: false, messege: "error in updation" })
            }

        } catch (error) {
            console.log(error, "error in profile controller ");

        }


    };

    return updateDoctorProfileController;
};

