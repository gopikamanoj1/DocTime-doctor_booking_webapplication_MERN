
import getAllAppoinmentsController from "./getAllAppoinmentsController"

export default (dependencies: any) => {
    return {
        getAllAppoinmentsController: getAllAppoinmentsController(dependencies)


    }

}