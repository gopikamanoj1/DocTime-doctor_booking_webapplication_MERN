import { Request, Response } from "express";
import session from "express-session";
import { uploadImage } from "../../../../utils/imagesService";


export default (dependencies: any) => {
    const { updateDoctorProfileUseCase } = dependencies.useCase;

    if (!updateDoctorProfileUseCase) {
        console.log('error ');
    }
    const updateDoctorProfileController = async (req: Request, res: Response) => {
        try {
            const { name, email, phone, specialization, street, city, state, fees, image, age, dob } = req.body

            let imageUrl: string | null = null; // Default value for imageUrl
            if (image) {
                // Upload to Cloudinary if an image is provided
                imageUrl = await uploadImage(image);
            }
            const data = {
                name,
                email,
                phone,
                specialization,
                street,
                city,
                state,
                fees,
                age,
                dob,
                image:imageUrl
            };

          

            const response = await updateDoctorProfileUseCase(dependencies).executeFunction(data)

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

