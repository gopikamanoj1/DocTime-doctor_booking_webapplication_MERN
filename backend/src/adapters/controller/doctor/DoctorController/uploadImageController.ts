import { Request, Response } from "express";
import {uploadImage} from "../../../../utils/imagesService";


export default (dependencies: any) => {
    const { sendImageUseCase } = dependencies.useCase;

  const uploadImageController = async (req: Request, res: Response) => {
 
    try {
        console.log("haiii");
        
        const {image}=req.body
        console.log(image,"image");
        
        const imageUrl= await uploadImage(image);
  
        const data={
          imageUrl
        }
        
        const response = await sendImageUseCase(dependencies).executeFunction(data)
        if (response && response.status && response.data) {
          res.json({ status: true, data: response.data });
  
      } else {
          res.json({ status: false, message: "Data not found" });
      }
    } catch (error) {
        console.log(error);
        
    }

  }
  return uploadImageController; 
};
