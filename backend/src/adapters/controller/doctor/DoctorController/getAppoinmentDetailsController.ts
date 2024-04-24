import { Request, Response } from "express";
export default (dependecies: any) => {


    const { getAppoinmentDetailsUseCase } = dependecies.useCase
    const getAppoinmentDetailsController = async (req: Request, res: Response) => {

        try {
            const { id } = req.body

            const data = {
                id
            }
            const response = await getAppoinmentDetailsUseCase(dependecies).executeFunction(data)
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: "Data not found" });
            }
        } catch (error) {
            console.log(error, "error in viewDoctorDetailsController ")
        }

    };
    return getAppoinmentDetailsController;
};
