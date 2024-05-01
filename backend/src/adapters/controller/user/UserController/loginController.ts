import { Request, Response } from "express";
export default (dependecies: any) => {
  

  const {loginUseCase}=dependecies.useCase
  const loginController = async (req: Request, res: Response) => {
    const {email,password}=req.body
    console.log(req.body,"hfffffffffffh");

    const data={
      email,
      password,
    }
  const responce =await loginUseCase(dependecies).executeFunction(data) 
  if(responce.status){
    res.json({status:true,data:responce.data})
  }else{
    res.json({status:false,message:responce.message})
  }
    
  };
  return loginController;
};

