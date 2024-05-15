import mongoose from "mongoose";


export const dbConnection = () => {
    console.log("Connecting to database...");

    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.error("Error connecting to database:", err);
        });
};
