import { Request, Response } from "express";



export default (dependencies: any) => {
  const { addSlotUseCase } = dependencies.useCase;

  if (!addSlotUseCase) {
    console.log('Error: addSlotUseCase not found');
  }

  const addSlotController = async (req: Request, res: Response) => {
    try {
      const {
        doctorId,
        startDate,
        endDate,
        daysOfWeek,
        startTime,
        endTime,
        breakDuration,
        consultationDuration,
        slots,
        isMultipleDays
      } = req.body;

   
      const data = {
        doctorId,
        startDate,
        endDate,
        daysOfWeek,
        startTime,
        endTime,
        breakDuration,
        consultationDuration,
        slots,
        isMultipleDays
      };

      const response = await addSlotUseCase(dependencies).executeFunction(data);

      if (response.status) {
        res.status(200).json({ status: true, message: 'Slots added successfully' });
      } else {
        res.json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log('Error in add slot controller:', error);
      res.status(500).json({ status: false, message: 'Error in add slot controller' });
    }
  };



  return addSlotController;
};