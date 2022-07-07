// la fonction connect db
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("database connected");
    } catch (error) {
        console.log("database is connected", error);
    }
};
module.exports = connectDB;
