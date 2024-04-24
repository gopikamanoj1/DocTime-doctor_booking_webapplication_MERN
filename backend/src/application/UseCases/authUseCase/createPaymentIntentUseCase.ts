export default function createPaymentIntentUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data:any) => { // Accept ID as a parameter
        try {

            const response = await userRepositery.createPaymentIntent(data);
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
