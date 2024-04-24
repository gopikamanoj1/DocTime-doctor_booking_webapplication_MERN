import { Request, Response } from "express";
export default (dependecies: any) => {
  

  const { getAvailableSlotUseCase}=dependecies.useCase
  const getAvailableSlotController = async (req: Request, res: Response) => {
   
    try {  
      const { id } = req.params;

           const response=await  getAvailableSlotUseCase(dependecies).executeFunction(id)
           
           

        if (response && response.status && response.data) {
          res.json({ status: true, data: response.data });
          
      } else {
          res.json({ status: false, message: "Data not found" });
      }   
    } catch (error) {
       console.log(error,"error in viewDoctorDetailsController ")
    }
    
  };
  return getAvailableSlotController;
};
