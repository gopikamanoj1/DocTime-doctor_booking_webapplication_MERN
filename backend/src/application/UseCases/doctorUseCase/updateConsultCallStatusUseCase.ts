export default function updateConsultCallStatusUseCase(dependencies: any) {
    const { doctorRepositery } = dependencies.repositery;
  
    const executeFunction = async (data: any) => {
    try {
      
      const response=await doctorRepositery.updateConsultCallStatus(data)
      
      if (response.status) {
          return { status: true, data: response.data };
        } else {
          return { status: false, message: response.message };
        }
    } catch (error) {
      console.log(error,"error in  updateConsultCallStatus");
      
    }
    };
  
    return { executeFunction };
  }
  
  
  
  