import { Request, Response } from "express";
import session from "express-session";
import uploadToS3 from "../../../../utils/imagesService";


export default (dependencies: any) => {
    const { updatePatientProfileUseCase } = dependencies.useCase;

    if (!updatePatientProfileUseCase) {
        console.log('EROOOOORRR');
    }
    const updatePatientProfileController = async (req: Request, res: Response) => {
        try {

            console.log('HIHIHIHIHIH');

            const { name, email, phone, street, city, state, zipcode, image, age, dob, gender, bloodGroup } = req.body
            const imageUrl = await uploadToS3(image, `${email}-PatientprofileImage`);
            const data = {
                name,
                email,
                phone,
                gender,
                street,
                city,
                state,
                zipcode,
                bloodGroup,
                image: imageUrl,
                age,
                dob
            }
            console.log(data, "data in updateDoctorProfileController");
            // req.session.doctorProfile = data;

            const response = await updatePatientProfileUseCase(dependencies).executeFunction(data)
            console.log(response, "res in new contro updatePatientProfileUseCase");



            if (response) {

                res.status(200).json({ status: true, data: response.data })
            } else {
                return ({ status: false, messege: "error in updation" })
            }

        } catch (error) {
            console.log(error, "error in profile controller ");

        }


    };

    return updatePatientProfileController;
};

