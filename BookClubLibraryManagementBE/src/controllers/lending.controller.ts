import { NextFunction, Request, Response } from "express";
import { APIError } from "../errors/ApiError";
import { LendingModel } from "../models/Lending"
// import { console } from "inspector";
import BookModel from "../models/Books";
import { ReaderModel } from "../models/Reader";

//land book record
export const landbook = (req:Request, res:Response, next:NextFunction) => {

    try {
        const { bookId, readerId, lendDate, dueDate, returnDate, status } = req.body;
        const book = BookModel.findById(bookId);
        if (!book) {
            return next(new APIError(404, "Book not found"));
        }
        const reader = ReaderModel.findById(readerId);
        if (!reader) {
            return next(new APIError(404, "Reader not found"));
        }
        const lending = new LendingModel({ bookId, readerId, lendDate, dueDate, returnDate, status });
        lending.save();
        res.status(201).json(lending);
    }catch (err) {
        next(err);
    }
    

}

//get all land book records
export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const records = await LendingModel.find();
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
}

//get land book record by reader id
export const getRecordByReaderId = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const readerId = req.params.id;
        const records = await LendingModel.findById({ readerId });
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
}

//get land book record by book id
export const getRecordByBookId = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const bookId = req.params.id;
        const records = await LendingModel.findById({ bookId });
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
}

//update return date
export const updatereturnDate = async(req:Request, res:Response, next:NextFunction) => {
    const {returnDate} = req.body;
    try{
        const landing = await LendingModel.findById(req.params.id)
        if(!landing){
            return next(new APIError(404, "Lending not found"));
        }
        landing.returnDate = returnDate
        landing.save();
        res.status(200).json(landing);
    }catch(err){
        next(err);
    }
}

//update land book record
export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const landBook = await LendingModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!landBook){
            return next(new APIError(404, "Lending not found"));
        }
        res.status(200).json(landBook);
    }catch(err){
        next(err);
    }
}

//delete land book record
export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const landBook = await LendingModel.findByIdAndDelete(req.params.id)
        if(!landBook){
             throw new APIError(404, "LandBook Record not found");
        }
        res.status(200).json(landbook)
    }catch(err){
        next(err)
    }
}