import { connect } from "@/utils/db"
import { User } from "@/models/user";
import { NextResponse } from "next/server";


export const GET = async (request)=>{
    try {
        await connect();
        const users = await User.find()
        return new NextResponse(JSON.stringify(users),{status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({error: error,message: "Failed to fetch Users"}),{status:500});
    }
    
}

export const POST = async (request) => {
    // console.log("request:",request);
    const user = await request.json();
    // console.log("User:",user);
    const {email} = user;
    try {
        await connect();

        const isUserAlreadyExist = await User.findOne({email})

        // console.log("isUserAlreadyExist:",isUserAlreadyExist);

        if(isUserAlreadyExist){
            return new NextResponse(JSON.stringify({ message: "User Already Exist" }), { status: 500 });
        }

        

        const newUser = await User(user);
        await newUser.save();

        return new NextResponse(JSON.stringify({user,message: "Successfully Created"}), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error, message: "Failed to Create User" }), { status: 500 });
    }

}