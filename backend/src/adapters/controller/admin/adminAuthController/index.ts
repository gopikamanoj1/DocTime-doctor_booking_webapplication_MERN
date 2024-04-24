import adminLoginController from "./adminLoginContoller"
import adminLogoutController from "./adminLogoutController"


export default (dependencies:any)=>{
 return {

    adminLoginController:adminLoginController(dependencies),
    adminLogoutController:adminLogoutController(dependencies)

 }

}