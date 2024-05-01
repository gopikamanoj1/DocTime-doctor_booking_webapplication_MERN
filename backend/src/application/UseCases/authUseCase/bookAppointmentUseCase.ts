export default function bookAppointmentUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {
        try {
            const response = await userRepositery.bookAppointment(data);

            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, data: response.data };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in bookAppointmentUseCase" };
        }
    };

    return { executeFunction };
}
