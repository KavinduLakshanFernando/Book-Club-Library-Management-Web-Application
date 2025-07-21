import { NextFunction, Request, Response } from "express"
import { APIError } from "../errors/ApiError";
import BookModel from "../models/Books";


//add books
export const addBook = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const book = new BookModel(req.body);
        await book.save();
        res.status(201).json(book);
    }catch(err){
        next(err);
        
    }
}

//get Books
export const getBooks = async(req:Request , res:Response, next:NextFunction) => {
    try{
        const book = await BookModel.find()
        res.status(200).json(book)
    }catch(err){
        next(err);
    }
}

//update books
export const editBooks = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!book){
            return next(new APIError(404, "Book not found"));
        }
        res.status(200).json(book);
    }catch(err){
        next(err);
    }
}

export const deleteBook = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const book = await BookModel.findByIdAndDelete(req.params.id)
        if(book){
            return next(new APIError(404, "Book not found"));
        }
        res.status(200).json(book);
    }catch(err){
        next(err);
        
    }
}