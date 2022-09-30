const { default: mongoose } = require("mongoose");

async function connectDB() {
    await mongoose.connect('mongodb://localhost/bubbles_app');
}

module.exports = connectDB;