
export default function forgotPasswordForDocUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {
        try {
            console.log("hy");
            const response = await doctorRepositery.forgotPasswordForDoc(data);
            if (response.status) {
                return { status: true, data: response.data };
            } else {
                return { status: false, data: response.data };
            }
        } catch (error) {
            console.log(error);
            return { status: false, message: "Error in adminUserUseCase" };
        }

    };

    return { executeFunction };
}
