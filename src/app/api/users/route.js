// import { connect } from "@/lib/db"
// import { User } from "@/models/user";
// import { NextResponse } from "next/server";


// export const GET = async (request)=>{
//     try {
//         await connect();
//         const users = await User.find()
//         return new NextResponse(JSON.stringify(users),{status: 200});
//     } catch (error) {
//         return new NextResponse("Failed to Fetch User",{status:500});
//     }
    
// }

// export const POST = async (request) => {
//     // console.log("request:",request);
//     const user = await request.json();
//     // console.log("User:",user);
//     const {email} = user;
//     try {
//         await connect();

//         const isUserAlreadyExist = await User.findOne({email})

//         // console.log("isUserAlreadyExist:",isUserAlreadyExist);

//         if(isUserAlreadyExist){
//             return new NextResponse("User Already Exist", { status: 409 });
//         }

//         const newUser = await User(user);
//         await newUser.save();

//         return new NextResponse(JSON.stringify({ user: newUser, message: "Successfully Created" }), { status: 201 });

//     } catch (error) {
//         return new NextResponse("Failed to Create User", { status: 500 });
//     }

// }



// // Status Codes: 
// // 201 Created: When a user is successfully created.
// // 200 OK: When an update to the user is successful.
// // 400 Bad Request: If the request data is invalid(e.g., missing required fields).
// // 401 Unauthorized: If the request is unauthorized(e.g., missing authentication).
// // 403 Forbidden: If the client does not have permission to perform the action.
// // 404 Not Found: If the resource(e.g., user) does not exist.
// // 409 Conflict: If there is a conflict, such as trying to create a user that already exists.
// // 500 Internal Server Error: If there is a server - side error during the operation.


import { connect } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

// GET request to fetch all users
export const GET = async (request) => {
    try {
        await connect();
        const users = await User.find();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Failed to fetch users", error: error.message }, { status: 500 });
    }
};

// POST request to create a new user
export const POST = async (request) => {
    const user = await request.json();
    const { email, username } = user;

    if (!email || !user.username || !user.password) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        await connect();
        const isUserAlreadyExist = await User.findOne({ $or: [{ email }, { username }] });

        if (isUserAlreadyExist) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const newUser = new User(user);
        await newUser.save();

        return NextResponse.json({ user: newUser, message: "Successfully created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Failed to create user", error: error.message }, { status: 500 });
    }
};
