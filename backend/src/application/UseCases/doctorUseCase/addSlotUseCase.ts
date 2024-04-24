

export default function addSlotUseCase(dependencies: any) {
  const { doctorRepositery } = dependencies.repositery;

  const executeFunction = async (data: any) => {
  
    const response = await doctorRepositery.addSlot(data);
  
    if (response.status) {
        return { status: true, message: response.message };

    } else {
      return { status: false, message: response.message };
    }
  };

  return { executeFunction };
}
