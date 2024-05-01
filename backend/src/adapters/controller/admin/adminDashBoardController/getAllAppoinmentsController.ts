import { Request, Response } from "express";

export default (dependencies: any) => {
    const { getAllAppoinmentsUseCase } = dependencies.useCase;

    const getAllAppoinmentsController = async (req: Request, res: Response) => {
       try {
  

        const response=await  getAllAppoinmentsUseCase(dependencies).executeFunction();
        console.log();
        

             if (response && response.status && response.data) {
                res.json({ status: true, data: response.data });
            } else {
                res.json({ status: false, message: "Data not found" });
            }
       } catch (error) {
        console.log(error);
        
       }
    };



    return getAllAppoinmentsController;
};
