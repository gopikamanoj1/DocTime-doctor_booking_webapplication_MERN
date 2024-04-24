


export default function updateEmailUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {


        const response = await userRepositery.updateEmail(data)
        console.log(response, "use resssso");



        if (response.status) {
            return { status: true, data: response.data };
        } else {
            return { status: false, message: response.message };
        }

    };

    return { executeFunction };
}
