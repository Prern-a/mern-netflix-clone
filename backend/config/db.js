import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
//async:without refresh get and post data
export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MONGO_DB connected: "+conn.connection.host);

    }catch(error){
        console.log("error connecting to mongodb"+error.message);
        process.exit(1);   //1 means error and 0 means success
        
    }
};
