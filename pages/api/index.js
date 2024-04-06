import Signup from "../../models/Signup";
import Login from "../../models/Login";
import dbConnect from "../../utils/dbConnect";

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    // create task
    if (method === "POST") {
        try {
            const newSignup = await new Signup(req.body).save();
            res.status(201).json({message: "newtask updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
            console.log(error);
        }
    }

    if (method === "GET") {
        try {
           
            const tasks = await Signup.find();
        
                res.status(200).json({ data: tasks});
            
           
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
            console.log(error);
        }
    }
};
