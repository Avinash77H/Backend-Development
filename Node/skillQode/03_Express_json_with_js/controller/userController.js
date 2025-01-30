import { UserUtil } from "../util/userUtil.js";


export const getAllUser = async(request,response)=>{
    try{
        let userData = await UserUtil.getAllUserFromDB();
       return response.status(200).json(userData);
    }
    catch(err){
       return response.status(500).json("Server Error");
    }
} 
