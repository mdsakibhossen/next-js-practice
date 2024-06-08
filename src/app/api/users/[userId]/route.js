// import { connect } from "@/lib/db"
// import { User } from "@/models/user";
// import { NextResponse } from "next/server";


// export const GET = async (request,{params}) => {
//     // console.log("Params",params);
//     const {userId} = params;
//     try {
//         await connect();
//         const user = await User.findById(userId);
//         return new NextResponse(JSON.stringify(user), { status: 200 });
//     } catch (error) {
//         return new NextResponse("Failed to fetch Users", { status: 500 });
//     }

// }

// export const PUT = async (request,{params}) => {
//     // console.log("Params",params);
//     const {userId} = params;
//     const user = await request.json();

//     try {
//         await connect();
//         const updatedUser = await User.findByIdAndUpdate(userId, user);
//         await updatedUser.save();

//         return new NextResponse("Successfully Updated", { status: 200 });

//     } catch (error) {
//         return new NextResponse("Failed to Update User", { status: 500 });
//     }

// }


// export const DELETE = async (request, { params }) => {
//     // console.log("Params",params);
//     const { userId } = params;

//     try {
//         await connect();
//         await User.findByIdAndDelete(userId);

//         return new NextResponse("Successfully Deleted", { status: 200 });

//     } catch (error) {
//         return new NextResponse("Failed to Delete User", { status: 500 });
//     }

// }

import { connect } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

// GET request to fetch a user by ID
export const GET = async (request, { params }) => {
    const { userId } = params;

    try {
        await connect();
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 });
    }
};

// PUT request to update a user by ID
export const PUT = async (request, { params }) => {
    const { userId } = params;
    const userData = await request.json();

    try {
        await connect();
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Updated", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Failed to update user", error: error.message }, { status: 500 });
    }
};

// DELETE request to delete a user by ID
export const DELETE = async (request, { params }) => {
    const { userId } = params;

    try {
        await connect();
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 });
    }
};
