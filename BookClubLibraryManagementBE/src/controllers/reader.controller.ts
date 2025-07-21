import { NextFunction, Request, Response } from "express"
import { APIError } from "../errors/ApiError";
import { ReaderModel } from "../models/Reader" 


// CREATE READER
export const createReader = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const reader = new ReaderModel(req.body);
        await reader.save();
        res.status(201).json(reader);
    }catch(err){
        next(err);
    }
}

//Get All Reader
export const getAllReaders = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const reader = await ReaderModel.find();
        res.status(200).json(reader);
    }catch(err){
        next(err);
    }
}

//update Reader
export const editReader = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const reader = await ReaderModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!reader){
            return next(new APIError(404, "Reader not found"));
        }
        res.status(200).json(reader);
    }catch(err){
        next(err);  
    }
}

//delete Reader
export const deleteReader = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const reader = await ReaderModel.findByIdAndDelete(req.params.id);
        if(!reader){
            return next(new APIError(404, "Reader not found"));
        }
        res.status(200).json(reader);
    }catch(err){
        next(err);  
    }
}