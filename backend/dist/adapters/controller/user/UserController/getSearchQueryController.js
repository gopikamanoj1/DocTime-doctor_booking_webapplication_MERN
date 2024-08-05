"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (dependecies) => {
    const { getSearchQueryUseCase } = dependecies.useCase;
    const getSearchQueryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { query } = req.query;
            const data = {
                query
            };
            const response = yield getSearchQueryUseCase(dependecies).executeFunction(data);
            console.log(response, '-----------------');
            if (response.status) {
                res.status(200).json({ status: true, data: response.data });
            }
            else {
                res.status(400).json({ status: false, message: response.message });
            }
        }
        catch (error) {
            console.error("Error in getConverstationsUseCase:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
    });
    return getSearchQueryController;
};
