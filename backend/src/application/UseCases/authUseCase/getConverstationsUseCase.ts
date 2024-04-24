
export default function getConverstationsUseCase(dependencies: any) {
    const {   userRepositery } = dependencies.repositery;

    const executeFunction = async (data:any) => {
        try {
            
            const response = await userRepositery.getConverstation(data);
            
            
            if (response.status) {
                return { status: true, data: response.data };
                
            } else {
                return { status: false, message: response.message };
            }
            
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in adminUserUseCase" };
        }

    };

    return { executeFunction };
}
