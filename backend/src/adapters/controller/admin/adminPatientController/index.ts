import adminUserController from './adminUserController'
import handleUserBlockController from './handleUserBlockController'


export default (dependencies:any)=>{
    return {
   
        adminUserController:adminUserController(dependencies),
        handleUserBlockController:handleUserBlockController(dependencies),
   
    }
   
   }