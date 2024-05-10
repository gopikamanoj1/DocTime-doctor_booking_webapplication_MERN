import { Request, Response } from "express";
import session from "express-session";
import {uploadToS3} from "../../../../utils/imagesService";


export default (dependencies: any) => {
    const { updatePatientProfileUseCase } = dependencies.useCase;

    if (!updatePatientProfileUseCase) {
        console.log('EROOOOORRR');
    }
    const updatePatientProfileController = async (req: Request, res: Response) => {
        try {
            const { name, email, phone, street, city, state, zipcode, age, dob, gender, bloodGroup, image } = req.body;
      
            let imageUrl:any= null; // Default value for imageUrl
      
            if (image) {
              // Only upload to S3 if an image is provided
              imageUrl = await uploadToS3(image, `${email}-PatientProfileImage`);
            }
      
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
              age,
              dob,
              image
            };
      
            if (imageUrl) {
              // Only add `image` if it exists
              data.image = imageUrl;
            }
      
            console.log(data, "Data in updatePatientProfileController");
      
            const response = await updatePatientProfileUseCase(dependencies).executeFunction(data);
      
            if (response && response.data) {
              res.status(200).json({ status: true, data: response.data });
            } else {
              res.status(400).json({ status: false, message: "Error updating profile" });
            }
          } catch (error) {
            console.error("Error in updatePatientProfileController:", error);
            res.status(500).json({ status: false, message: "Internal Server Error" });
          }
        };
      

    return updatePatientProfileController;
};

