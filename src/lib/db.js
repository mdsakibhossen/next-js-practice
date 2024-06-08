// import mongoose from "mongoose"

// const MONGO_URI = process.env.MONGO_URI

// export const connect = async () => {

//     const connectionState = mongoose.connection.readyState;
//     // console.log("connectionState:", connectionState);



//     if (connectionState === 1) {
//         // console.log("Already Connectd");
//         return;
//     }
//     if (connectionState === 2) {
//         // console.log("Connecting...");
//         return;
//     }



//     try {

//         await mongoose.connect(MONGO_URI, {
//             dbName: "testDB",
//             bufferCommands: false
//         })
//         // console.log("Connected Successfully");

//     } catch (error) {

//         // console.log("DBError:", error, "error.message", error.message);
//         throw new Error("Connection Failed" + error.message)

//     }

// }


// // 0 = disconnected
// // 1 = connected
// // 2 = connecting
// // 3 = disconnecting



import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
}

export const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    // Log the connection state
    console.log(`Current connection state: ${connectionState}`);

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (connectionState === 1 || connectionState === 2) {
        console.log("Already connected or connecting...");
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "testDB",
            bufferCommands: false,
            useNewUrlParser: true, // Optional but recommended for better error handling
            useUnifiedTopology: true, // Optional but recommended for better error handling
        });
        console.log("Connected Successfully");
    } catch (error) {
        console.error("Connection Failed", error.message);
        throw new Error("Connection Failed: " + error.message);
    }
};
