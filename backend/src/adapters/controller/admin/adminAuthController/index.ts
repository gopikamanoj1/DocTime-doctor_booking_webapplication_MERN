import adminLoginController from "./adminLoginContoller"



export default (dependencies:any)=>{
 return {

    adminLoginController:adminLoginController(dependencies),

 }

}