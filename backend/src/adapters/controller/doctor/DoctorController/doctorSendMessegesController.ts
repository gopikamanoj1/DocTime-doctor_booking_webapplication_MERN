import { log } from "console";
import { Request, Response } from "express";

export default (dependencies: any) => {
    const { doctorSendMessegesUseCase } = dependencies.useCase;

    const doctorSendMessegesController = async (req: Request, res: Response) => {
        try {
            const {  
                 content,
                recieverId,
                senderId,
                type ,
                converstationId,

            } = req.body

            const data = {
                content,
                recieverId,
                senderId,
                type,
                converstationId
            }

            const response = await doctorSendMessegesUseCase(dependencies).executeFunction(data)
   
            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: "Data not found" });
            }

        } catch (error) {

        }
    };


    return doctorSendMessegesController;
};
