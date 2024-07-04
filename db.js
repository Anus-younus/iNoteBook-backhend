const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://anusyounus127:anusanus@cluster0.fpbgnnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connection sucessful database");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0)
    }
}

module.exports = connectToMongo;