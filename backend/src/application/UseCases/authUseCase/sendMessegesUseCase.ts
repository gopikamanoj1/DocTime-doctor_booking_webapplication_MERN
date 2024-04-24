


export default function sendMessegesUseCase(dependencies: any) {
    const { userRepositery } = dependencies.repositery;

    const executeFunction = async (data: any) => {


        const response = await userRepositery.sendMesseges(data)
        console.log(response, "use resssso");

        if (response.status) {
            return { status: true, data: response.data };
        } else {
            return { status: false, message: response.message };
        }

    };

    return { executeFunction };
}
