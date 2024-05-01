import { log } from "console";
import { Request, Response } from "express";

export default (dependencies: any) => {
    const { updateEmailForDOCUseCase } = dependencies.useCase;

    const updateEmailFORDOCController = async (req: Request, res: Response) => {
        try {
            const { email ,newEmail} = req.body

            const data = {
                email,newEmail
            }

            const response = await updateEmailForDOCUseCase(dependencies).executeFunction(data)


            console.log(response,"res ion contr");
            

            if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });

            } else {
                res.json({ status: false, message: "Data not found" });
            }

        } catch (error) {

        }
    };


    return updateEmailFORDOCController;
};
