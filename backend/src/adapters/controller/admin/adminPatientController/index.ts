import adminUserController from './adminUserController'



export default (dependencies:any)=>{
    return {
   
        adminUserController:adminUserController(dependencies),
   
    }
   
   }