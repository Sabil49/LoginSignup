import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    loginEmail: {type:String, required:true},
    loginPassword: {type:String, required:true},
    time : {type : Date, default: Date.now},
});

export default mongoose.models.Login || mongoose.model('Login', loginSchema);
