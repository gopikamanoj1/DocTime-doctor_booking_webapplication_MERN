import { Request, Response } from "express";
export default (dependecies: any) => {


    const { getConvetsationIdForVideoCallUseCase } = dependecies.useCase
    const getConvetsationIdForVideoCallController = async (req: Request, res: Response) => {

        try {
            const { userId,doctorId } = req.body;
            const data = {
                userId,doctorId
            }
            const response = await getConvetsationIdForVideoCallUseCase(dependecies).executeFunction(data)
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: response.data });
            }
        } catch (error) {
            console.log(error, "error in viewDoctorDetailsController ")
        }

    };
    return getConvetsationIdForVideoCallController;
};
