import { User } from "../models/user.js";
import bcrypt from "bcrypt"

import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {


};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password"
        });

    sendCookie(user, res, `Welcome back, ${user.name}`, 200)



};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    


    if (user) return next(new ErrorHandler("User Already exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
};


export const getMyProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });

};

export const logout = (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()),
        // These below two lines code are for deployment
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        sameSite: process.env.NODE_ENV === "Development" ? false : true,
     }).json({
        success: true,
        user: req.user,
    });
};