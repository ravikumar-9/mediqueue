import type { Request, Response } from "express"

export const Login=(req:Request,res:Response,next:any)=>{
    const token=req.headers["authorization"]?.split(" ")[1];
    if (!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}