const mongoose = require("mongoose");

module.exports = mongoose.model("Servers", new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    prefix: { type: String, required: true, default: "n!" }
}));