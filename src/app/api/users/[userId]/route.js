import { connect } from "@/lib/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

// GET request to fetch a user by ID
// 1st parameter always request
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
        // console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 });
    }
};

// PUT request to update a user by ID
export const PUT = async (request, { params }) => {

    const { userId } = params;
    const userData = await request.json();

    try {
        await connect();
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        // By default, findByIdAndUpdate returns the document as it was before the update.Setting new: true changes this behavior to return the document after the update has been applied



        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully Updated", user: updatedUser }, { status: 200 });
    } catch (error) {
        // console.error("Error updating user:", error);
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
        // console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 });
    }
};