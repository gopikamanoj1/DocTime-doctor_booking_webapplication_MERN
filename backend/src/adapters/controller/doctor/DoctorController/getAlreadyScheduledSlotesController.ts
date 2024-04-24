import { Request, Response } from "express";
export default (dependecies: any) => {


    const { getAlreadyScheduledSlotesUseCase } = dependecies.useCase
    const getAlreadyScheduledSlotesController = async (req: Request, res: Response) => {

        try {
            const { doctorId } = req.body

            const data = {
                doctorId
            }
            const response = await getAlreadyScheduledSlotesUseCase(dependecies).executeFunction(data)
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: "Data not found" });
            }
        } catch (error) {
            console.log(error, "error in viewDoctorDetailsController ")
        }

    };
    return getAlreadyScheduledSlotesController;
};
