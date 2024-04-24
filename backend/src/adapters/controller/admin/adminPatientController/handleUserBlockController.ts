import { Request, Response } from "express";

export default (dependencies: any) => {
    const { handleUserBlockUseCase } = dependencies.useCase;
    const handleUserBlockController = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const response = await handleUserBlockUseCase(dependencies).executeFunction(userId);
            if (response && response.status) {
                res.json({ status: true, data: response.data });
            } else {
                res.status(400).json({ status: false, message: response.message || "User blocking/unblocking failed" });
            }
        } catch (error) {
            console.error("Error in handleUserBlockController:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    };

    return handleUserBlockController;
};
