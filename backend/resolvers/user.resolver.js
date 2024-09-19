import {users} from '../dummyData/data.js'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const userResolver = {
    Mutation:{
       signUp : async(_,{input},context) =>{
        try {
            const {username , name , password , gender} = input;

            if(!username || !name || !password || !gender){
                throw new Error("All fields are required");
            }

            const existingUser = await user.findOne({ username});
            if(existingUser){
                throw new Error("User already exists")
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

            const newUser = new User({
                username,
                name,
                password:hashedPassword,
                gender,
                profilePicture:gender === "male" ? boyProfilePic : girlProfilePic
            })

            await newUser.save();
            await context.login(newUser)
            return newUser;

        } catch (err) {
            console.error("Error in signUp : " , err);
            throw new Error (err.message || "Internal server error")
        }
       } ,

       login: async(_,{input}, context) => {
        try {
            const {username , password} = input;
           const {user} =  await context.authenticate("graphql-local", {username , password})

           await context.login(user);
           return user
        } catch (error) {
            console.error("Error in login : " , err);
            throw new Error (err.message || "Internal server error")
       
        }
       },

       logout : async(_,args,context)=>{
        try {
            await context.logout();
            req.session.destory((err)=>{
                if(err) throw err;
            })
            res.clearCookie("connect.sid");
            return {message : "Logeed out successfully"}
        } catch (error) {
            console.error("Error in logout : " , err);
            throw new Error (err.message || "Internal server error")
       
        }
       }





    } ,
    Query:{
        // users:(_,args,{req, res}) =>{
        //     return users
        // },

    authUser: async(_,args,context) =>{
        try {
            const user = await context.getUser()
            return user;
        } catch (err) {
            console.error("Enter in authUser : " , err);
            throw new Error("Internal server error");
        }
    }
        ,
        // user:(_,{userId}) =>{
        //     return users.find((user) => user._id === userId);
        // }
        user: async (_,{userId}) =>{
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error("Enter in user query : " , err);
                throw new Error( err.message || "Error getting user ");
            }
        }
    },

    ///ToDo => Add User Transation Relatio
  
}

export default userResolver