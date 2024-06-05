import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

export const connect = async () => {

    const connectionState = mongoose.connection.readyState;
    // console.log("connectionState:", connectionState);



    if (connectionState === 1) {
        // console.log("Already Connectd");
        return;
    }
    if (connectionState === 2) {
        // console.log("Connecting...");
        return;
    }



    try {

        await mongoose.connect(MONGO_URI, {
            dbName: "testDB",
            bufferCommands: false
        })
        // console.log("Connected Successfully");

    } catch (error) {

        // console.log("DBError:", error, "error.message", error.message);
        throw new Error("Connection Failed" + error.message)

    }

}


// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting