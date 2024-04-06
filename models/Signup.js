import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required:true},
    contact: {type:Number, required: true},
    password: {type:String, required: true},
    confirmPassword: {type:String, required: true},
});

export default mongoose.models.Signup || mongoose.model('Signup', signupSchema);
