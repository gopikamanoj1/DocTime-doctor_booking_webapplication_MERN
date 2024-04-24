export default function loadSuccessUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data:any) => { // Accept ID as a parameter
        try {
            // Pass the ID to the repository method
            const response = await userRepositery.loadSuccess(data);
            
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, message: response.message };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in viewDoctorDetailsUseCase" };
        }
    };

    return { executeFunction };
}
