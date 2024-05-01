


export default function updateEmailForDOCUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {


        const response = await doctorRepositery.updateEmailDoc(data)
        console.log(response, "use resssso");



        if (response.status) {
            return { status: true, data: response.data };
        } else {
            return { status: false, message: response.message };
        }

    };

    return { executeFunction };
}
