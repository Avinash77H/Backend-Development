import { Request,Response } from "express";
import { UserUtil } from "../util/UserUtils"
import { IBook } from "../model/IBook";

export const getAllUser = async(request:Request,response:Response)=>{
  try{
  let userData:IBook[] = await UserUtil.getAllUserFromDb();
  return response.status(200).json(userData);
}
catch(err){
  return response.status(500).json({msg:"Server Error"})
}
}