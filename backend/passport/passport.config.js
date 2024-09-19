import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport =async () =>{
    passport.serializeUser((user , done) =>{
        console.log("Serializing user")
        done(null , user.id);
    });
    passport.deserializeUser(async(id, done) => {
        console.log("Deserializing user");
        try {
            const user =await user.findById(id);
            done(null , user)

        } catch (error) {
            done(err);
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async (username , passport , done) =>{
            try {
                const user = await User.findOne({username});
                if(!user){
                    throw new Error("Invalid username or password")
                }
                const validPassword = await bcrypt.compare(passport, user.password);

                if(!validPassword){
                    throw new Error("Inavalid username or password")
                }
                return done(null , user)
            } catch (err) {
                return done(err)
            }
        })
    )
}