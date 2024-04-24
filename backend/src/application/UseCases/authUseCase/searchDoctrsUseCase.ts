export default function searchDoctrsUseCase(dependencies: any) {
  
  const { userRepositery } = dependencies.repositery;

    const executeFunction = async (searchParams:any) => { 
        try {
          
            const response = await userRepositery.searchDoctors(searchParams);
            
            
            if (response.status) {
              return { status: true, data: response.data };
            } else {
              return { status: false, message: response.message };
            }
          } catch (error) {
            console.log(error);  
            return { status: false, message: "Error in searchDoctorsUseCase" };
          }
    };

    return { executeFunction };
}
