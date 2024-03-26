import { Request, Response } from "express";

export default (dependencies: any) => {
    const { getKycDetailsUseCase } = dependencies.useCase;

    const adminDoctorController = async (req: Request, res: Response) => {
       try {
        const doctorId = req.params.doctorId; // Retrieve doctorId from query parameters
// console.log(doctorId,"id kittiii");

        const response=await getKycDetailsUseCase(dependencies).executeFunction(doctorId);
        console.log(response,"res kitii55");

             // Check if the response object and its data property are defined
             if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            } else {
                res.json({ status: false, message: "Data not found" });
            }
       } catch (error) {
        console.log(error);
        
       }
    };



    return adminDoctorController;
};
