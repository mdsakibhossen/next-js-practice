import { connect } from "@/utils/db"
import { User } from "@/models/user";
import { NextResponse } from "next/server";


export const GET = async (request,{params}) => {
    // console.log("Params",params);
    const {userId} = params;
    try {
        await connect();
        const user = await User.findById(userId);
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error, message: "Failed to fetch Users" }), { status: 500 });
    }

}

export const PUT = async (request,{params}) => {
    // console.log("Params",params);
    const {userId} = params;
    const user = await request.json();

    try {
        await connect();
        const updatedUser = await User.findByIdAndUpdate(userId, user);
        await updatedUser.save();

        return new NextResponse(JSON.stringify({ user, message: "Successfully Updated" }), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error, message: "Failed to Update User" }), { status: 500 });
    }

}


export const DELETE = async (request, { params }) => {
    // console.log("Params",params);
    const { userId } = params;

    try {
        await connect();
        await User.findByIdAndDelete(userId);

        return new NextResponse(JSON.stringify({ message: "Successfully Deleted" }), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error, message: "Failed to Delete User" }), { status: 500 });
    }

}