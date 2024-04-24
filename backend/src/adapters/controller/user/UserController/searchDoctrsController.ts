import { Request, Response } from "express";
export default (dependecies: any) => {


  const { searchDoctrsUseCase } = dependecies.useCase
  const searchDoctrsController = async (req: Request, res: Response) => {

    try {
        const searchParams = {
          doctorName: req.body.doctorName
        };
        
        
        const response = await searchDoctrsUseCase(dependecies).executeFunction(searchParams);
    
        if (response.status ) {
          res.json({ status: true, data: response.data });
        } else {
          res.json({ status: false, messege: response.messege  });
        }
      } catch (error) {
        console.log(error, "error in searchDoctorsController ");
        res.status(500).json({ status: false, message: "Internal server error" });
      }
    };
  return searchDoctrsController;
};